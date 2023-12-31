import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import SellerProfilePage from "../../seller/SellerProfilePage";
import MemberSidebar from "../../components/MemberSidebar";

const SellerProfile = () => {
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <div className="flex min-h-screen">
        <MemberSidebar />
        <SellerProfilePage />
      </div>
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default SellerProfile;
