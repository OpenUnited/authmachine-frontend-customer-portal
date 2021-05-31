/* Landing page router
* Define the custom landing page in view
* {path: "page-name", component: ComponentName}
* params:
*   - path: url path name, for example "page-name". The page will be available in the "/landing-pages/page-name" link;
*   - component: component name.
* */
import RegisterLandingPage from "./pages/LandingPages/RegisterLandingPage/RegisterLandingPage";

export const landingPagesRouter = [
  {path: "contribute-to-open-products", component: RegisterLandingPage}
]