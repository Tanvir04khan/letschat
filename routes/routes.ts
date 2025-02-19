export const routes: {
  path: string;
  headerShown: boolean;
}[] = [
  { path: "clickedPhoto/[clickedPhoto]", headerShown: false },
  { path: "camera", headerShown: false },
  { path: "index", headerShown: true },
  { path: "home", headerShown: true },
  { path: "[userId]", headerShown: true },
  { path: "+not-found", headerShown: true },
];
