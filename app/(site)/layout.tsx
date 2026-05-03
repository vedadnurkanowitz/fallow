import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getShopInfo } from "@/lib/sanity/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const shopInfo = await getShopInfo();

  return (
    <>
      {shopInfo?.announcement && (
        <div className="bg-roast text-milk text-center px-4 py-2.5">
          <p className="text-small font-body">{shopInfo.announcement}</p>
        </div>
      )}
      <Nav hours={shopInfo?.hours} />
      <main className="flex-1">{children}</main>
      <Footer shopInfo={shopInfo} />
    </>
  );
}
