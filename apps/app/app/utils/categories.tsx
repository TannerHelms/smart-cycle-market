import SvgIcon from "@assets/svg-icons";


export type Category = {
  name: string;
  icon: JSX.Element;
};

const categories: Category[] = [
  { name: "Automotive", icon: <SvgIcon.Automobile /> },
  { name: "Beauty & Personal Care", icon: <SvgIcon.Beauty /> },
  { name: "Books", icon: <SvgIcon.Books /> },
  { name: "Electronics", icon: <SvgIcon.Electronics /> },
  { name: "Fashion", icon: <SvgIcon.Fashion /> },
  { name: "Fitness", icon: <SvgIcon.Fitness /> },
  { name: "Home & Kitchen", icon: <SvgIcon.HomeAndKitchen /> },
  { name: "Sports & Outdoors", icon: <SvgIcon.SportsAndOutdoor /> },
  { name: "Tools & Home Improvement", icon: <SvgIcon.Tools /> },
  { name: "Toys & Games", icon: <SvgIcon.ToysAndGames /> },
];

export default categories;
