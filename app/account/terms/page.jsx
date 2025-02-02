"use client";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { useRouter } from "next/navigation";
import React from "react";

const Terms = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="w-full min-h-screen grad md:px-40 px-0 text-white flex flex-col items-center">
      <Navbar />
      <ProtectedRoute>
        <div className=" w-full flex flex-col flex-grow poppins-400 ">
          <div className="bg-[#1C1B19]  flex flex-col flex-grow pb-8">
            <div>
              <button
                onClick={handleBack}
                className="border border-white rounded-full p-1 m-2 md:hidden"
              >
                <img
                  src="/back.png"
                  alt="Go Back"
                  className="w-[14px] h-[14px]"
                />
              </button>
            </div>
            <div className=" text-[#8C00FF] poppins-600 text-[28px] text-center md:mt-8">
              Terms of Service
            </div>
            <p className="text-center mt-3 text-gray-400">
            Last updated November 17, 2024
            </p>
            <div className="mt-4 flex flex-col gap-4 px-2">
              <div className="flex flex-col gap-2">
                <h2 className="poppins-600 text-[24px] text-[#8C00FF]">AGREEMENT TO OUR LEGAL TERMS</h2>
                <p className="text-[14px]">
                  We are Blockive Deducation Academy Private Limited, doing
                  business as Earnr ('Company', 'we', 'us', or 'our'), a
                  company registered in India at Plot A-34, Shastri Nagar,
                  RICCO, Jhujhunu-333001, Rajasthan, India. Our GST number is
                  08AALCB6893L1ZU. We operate the website https://www.earnr.live
                  (the 'Site'), as well as any other related products and
                  services that refer or link to these legal terms (the 'Legal
                  Terms') (collectively, the Services'). You can contact us by
                  phone at 9928893561, email at abhay@earnr.live, or by mail to
                  Plot A-34, Shastri Nagar, RICCO, Jhujhunu-333001, Rajasthan,
                  India. These Legal Terms constitute a legally binding
                  agreement made between you, whether personally or on behalf of
                  an entity ('you'), and Blockive Deducation Academy Private
                  Limited, concerning your access to and use of the Services.
                  You agree that by accessing the Services, you have read,
                  understood, and agreed to be bound by all of these Legal
                  Terms.
                </p>
                <p className="text-[14px] text-red-500">
                  IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU
                  ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST
                  DISCONTINUE USE IMMEDIATELY.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="poppins-600 text-[24px] text-[#8C00FF]">Introduction</h2>
                <p className="text-[14px]">
                  Welcome to Earnr, operated by Blockive Deducation Academy
                  Pvt. Ltd. ("Earnr", "we", "us", or "our"), a pioneering
                  platform committed to revolutionizing education through a
                  decentralized, blockchain-based educational system. By
                  accessing or using our services, website, and any associated
                  content/products (collectively, the "Services"), you agree to
                  these Terms of Service ("Terms") and our Privacy Policy.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="poppins-600 text-[24px] text-[#8C00FF]">Company Details</h2>
                <p className="text-[14px]">
                  Blockive Deducation Academy Pvt. Ltd. CIN:
                  U62099RJ2023PTC088351 Registered Office: Plot A-34, Shastri
                  Nagar, RICCO, Jhujhunu-333001, Rajasthan, India GST Number:
                  08AALCB6893L1ZU
                </p>

                <div className="flex flex-col gap-4">
                 
                  <div>
                    <h2 className="poppins-600 text-[20px] text-[#8C00FF]">1. Acceptance of Terms</h2>
                    <p className="text-[14px]">
                      By accessing Earnr, you confirm that you have read,
                      understood, and agreed to be bound by these Terms. If you
                      do not agree with any part of these Terms, you must not
                      use our Services.
                    </p>
                  </div>
                  <div>
                    <h2 className="poppins-600 text-[20px] text-[#8C00FF]">2. Blockchain Technology</h2>
                    <p className="text-[14px]">
                      Earnr utilizes blockchain technology, which requires an
                      understanding of its use and limitations. You acknowledge
                      the inherent risks associated with using decentralized
                      networks and blockchain technology.
                    </p>
                  </div>
                  <div>
                    <h2 className="poppins-600 text-[20px] text-[#8C00FF]">3. Account</h2>
                    <p className="text-[14px]">
                      Creation and Responsibility To access certain features of
                      Earnr, you may need to create an account. You are
                      responsible for maintaining the confidentiality of your
                      account information and for all activities under your
                      account.
                    </p>
                  </div>
                  <div>
                    <h2 className="poppins-600 text-[20px] text-[#8C00FF]"> 4. Intellectual</h2>
                    <p className="text-[14px]">
                      Property Rights All content provided on Earnr, including
                      text, graphics, logos, and software, is the property of
                      Blockive Deducation Academy Pvt. Ltd. or its licensors and
                      is protected by copyright and intellectual property laws.
                    </p>
                  </div>
                  <div>
                    <h2 className="poppins-600 text-[20px] text-[#8C00FF]"> 5. User Conduct</h2>
                    <p className="text-[14px]">
                      Users of Earnr are expected to behave responsibly and
                      respect the rights of others. Prohibited activities
                      include, but are not limited to, submitting false
                      information, infringing on others' intellectual property,
                      and conducting illegal transactions.
                    </p>
                  </div>
                  <div>
                    <h2 className="poppins-600 text-[20px] text-[#8C00FF]"> 6. Decentralized Nature of Services</h2>
                    <p className="text-[14px]">
                      Given the decentralized nature of Earnr, we do not have
                      the same control over content or transactions as
                      traditional platforms. You acknowledge this aspect and
                      agree that Earnr is not liable for any content or
                      transactions facilitated through its platform.
                    </p>
                  </div>
                  <div>
                    <h2 className="poppins-600 text-[20px] text-[#8C00FF]"> 7. Amendments to Terms</h2>
                    <p className="text-[14px]">
                      We reserve the right to modify these Terms at any time.
                      Your continued use of Earnr after any changes indicates
                      your acceptance of the new Terms.
                    </p>
                  </div>
                  <div>
                    <h2 className="poppins-600 text-[20px] text-[#8C00FF]"> 8. Contact Information</h2>
                    <p className="text-[14px]">
                      For any inquiries or concerns regarding these Terms or our
                      Services, You can contact us by phone at 9928893561, email
                      at abhay@earnr.live, or by post to Plot A-34, Shastri
                      Nagar, RICCO, Jhujhunu-333001, Rajasthan, India.
                    </p>
                  </div>
                  <div>
                    <h2 className="poppins-600 text-[20px] text-[#8C00FF]"> 9. Governing Law</h2>
                    <p className="text-[14px]">
                      These Terms shall be governed and construed in accordance
                      with the laws of India, without regard to its conflict of
                      law provisions.
                    </p>
                  </div>
                  <div>
                    <h2 className="poppins-600 text-[20px] text-[#8C00FF]"> 10. Dispute Resolution</h2>
                    <p className="text-[14px]">
                      Any disputes arising from these Terms will be resolved
                      through arbitration in accordance with the Arbitration and
                      Conciliation Act, 1996, by a sole arbitrator appointed by
                      us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default Terms;
