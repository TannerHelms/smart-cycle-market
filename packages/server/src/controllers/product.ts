import { RequestHandler } from "express";
import { sendErrorRes } from "src/utils/helper";
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { ProductModel } from "src/models/product";
import cloudUploader, { cloudApi } from "src/cloud";
import { isValidObjectId } from "mongoose";
import { UserDocument } from "src/models/user";
import categories from "src/utils/categories";

const uploadImage = (filePath: string): Promise<UploadApiResponse> => {
    return cloudUploader.upload(filePath, {
        width: 1280,
        height: 720,
        crop: "fill",
    })
}

export const createProduct: RequestHandler = async (req, res) => {
    const { name, price, category, purchasingDate, description } = req.body;
    const { images: files } = req.files;

    if (!files) return sendErrorRes(res, 'Image is required', 422)
    const images = Array.isArray(files) ? files : [files];

    if (images.length > 5) return sendErrorRes(res, 'Maximum 5 images are allowed!', 422)

    for (let img of images) {
        if (!img.mimetype?.startsWith("image")) return sendErrorRes(res, 'Invalid image file', 422)
    }

    const uploadedImages = await Promise.all(images.map(image => uploadImage(image.filepath)))

    const newProduct = await ProductModel.create({
        owner: req.user.id,
        name,
        price,
        category,
        purchasingDate,
        description,
    })
    newProduct.images = uploadedImages.map(img => ({ url: img.secure_url, id: img.public_id }))
    newProduct.thumbnail = uploadedImages[0].secure_url
    await newProduct.save()

    res.status(201).json({ message: "Product created successfully!" })
}


export const updateProduct: RequestHandler = async (req, res) => {

    const { id } = req.params
    if (!isValidObjectId(id)) return sendErrorRes(res, 'Invalid product id', 422)

    const product = await ProductModel.findOneAndUpdate({ _id: id, owner: req.user.id }, req.body, { new: true })
    if (!product) return sendErrorRes(res, 'Product not found!', 404)

    const { images: files } = req.files;

    if (!files) return res.status(201).json({ message: "Product updated successfully!" })
    const images = Array.isArray(files) ? files : [files];

    if (product.images.length + images.length > 5) return sendErrorRes(res, 'Maximum 5 images are allowed!', 422)

    for (let img of images) {
        if (!img.mimetype?.startsWith("image")) return sendErrorRes(res, 'Invalid image file', 422)
    }

    const uploadedImages = await Promise.all(images.map(image => uploadImage(image.filepath)))

    product.images.push(...uploadedImages.map(img => ({ url: img.secure_url, id: img.public_id })))
    await product.save()

    res.status(201).json({ message: "Product updated successfully!" })
}

export const deleteProduct: RequestHandler = async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) return sendErrorRes(res, 'Invalid product id', 422)

    const product = await ProductModel.findOneAndDelete({ _id: id, owner: req.user.id })
    if (!product) return sendErrorRes(res, 'Product not found!', 404)

    const ids = product.images.map(img => img.id)
    await cloudApi.delete_resources(ids)
    res.json({ message: "Product deleted successfully!" })
}
export const deleteImage: RequestHandler = async (req, res) => {
    const { id, imageId } = req.params
    if (!isValidObjectId(id) || imageId.trim().length === 0) return sendErrorRes(res, 'Invalid product or image id', 422)

    const product = await ProductModel.findOne({ _id: id, owner: req.user.id })
    if (!product) return sendErrorRes(res, 'Product not found!', 404)

    const image = product.images.find(img => img.id === imageId)
    if (!image) return sendErrorRes(res, 'Image not found!', 404)

    await cloudApi.delete_resources([image.id])
    product.images = product.images.filter(img => img.id !== imageId)
    await product.save()

    res.json({ message: "Image deleted successfully!" })
}

export const getProduct: RequestHandler = async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) return sendErrorRes(res, 'Invalid product id', 422)

    const product = await ProductModel.findById(id).populate<{ owner: UserDocument }>('owner', "name email avatar")
    if (!product) return sendErrorRes(res, 'Product not found!', 404)
    if (product.owner.avatar) product.owner.avatar.url = product.owner.avatar.url
    res.json({
        product: {
            id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            purchasingDate: product.purchasingDate,
            description: product.description,
            images: product.images.map(img => img.url),
            thumbnail: product.thumbnail,
            owner: {
                id: product.owner._id,
                name: product.owner.name,
                email: product.owner.email,
                avatar: product.owner.avatar?.url
            }
        }
    })
}

export const getProductsByCategory: RequestHandler = async (req, res) => {
    const { category } = req.params
    const { pageNo = "1", limit = "10" } = req.query as { pageNo: string, limit: string }
    if (!category || !categories.includes(category)) return sendErrorRes(res, 'Invaid Category', 422)

    const products = await ProductModel.find({ category })
        .sort("-createdAt")
        .skip((+pageNo - 1) * +limit)
        .limit(+limit)

    res.json({ products })
}

export const getLatest: RequestHandler = async (req, res) => {
    const products = await ProductModel.find()
        .sort("-createdAt")
        .limit(10)

    res.json({ products })
}

export const getListings: RequestHandler = async (req, res) => {
    const { pageNo = "1", limit = "10" } = req.query as { pageNo: string, limit: string }

    const products = await ProductModel.find({ owner: req.user.id })
        .sort("-createdAt")
        .skip((+pageNo - 1) * +limit)
        .limit(+limit)
        .populate<{ owner: UserDocument }>('owner', "name email avatar")

    res.json({ products })
}
