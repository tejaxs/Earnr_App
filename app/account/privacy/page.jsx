"use client";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { useRouter } from "next/navigation";
import React from "react";

const Privacy = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="w-full min-h-screen grad md:px-40 px-0 text-white flex flex-col items-center">
      <Navbar />
      <ProtectedRoute>
        <div className="md:w-full w-full flex flex-col flex-grow poppins-400 ">
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
            <div className="text-[#8C00FF] poppins-600 text-[28px] text-center md:mt-8">Privacy Policy for Earnr</div>
            <span className=" text-center mt-3 text-gray-400">Last updated November 17, 2024</span>
            <div className="mt-4 flex flex-col gap-4 px-2">
              <div className="flex flex-col gap-2">
                Welcome to Earnr, accessible from Earnr.live, where we are
                dedicated to revolutionizing the educational system with our
                decentralized, transparent, and open platform. At Earnr, the
                privacy and security of our visitors and users are paramount.
                This Privacy Policy document details the types of information we
                collect and record at Earnr and how we utilize it. Should you
                have any queries or require more information about our Privacy
                Policy, please do not hesitate to contact us. This Privacy
                Policy applies solely to our online activities and is valid for
                visitors to our website with regards to the information that
                they shared and/or collect in Earnr. This policy is not
                applicable to any information collected offline or via channels
                other than this website.
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="poppins-600 text-[24px] text-[#8C00FF]">Consent</h2>
                <p className="text-[14px]">
                  By using our website, you hereby consent to our Privacy Policy
                  and agree to its terms.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="poppins-600 text-[24px] text-[#8C00FF]">Information We Collect</h2>
                <p className="text-[14px]">
                  We will inform you of the personal information we are asking
                  you to provide and the reasons for doing so at the point of
                  collection. Should you decide to contact us directly, we may
                  receive additional information about you such as your name,
                  email address, phone number, the contents of the message
                  and/or attachments you may send us, and any other information
                  you may choose to provide. Upon registering for an Account, we
                  may ask for your contact details, including items such as
                  name, company name, address, email address, and telephone
                  number.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="poppins-600 text-[24px] text-[#8C00FF]">How We Use Your Information</h2>
                <p className="text-[14px]">
                  We utilize the information we collect in various ways,
                  including to:
                  <li>Provide, operate, and maintain our website</li>
                  <li>Improve, personalize, and expand our website</li>
                  <li>Understand and analyze how you use our website</li>
                  <li>
                    Develop new products, services, features, and functionality
                  </li>
                  <li>
                    Communicate with you, for customer service, to provide you
                    with updates and other information relating to the website,
                    and for marketing and promotional purposes Send you emails
                  </li>
                  <li>Find and prevent fraud</li>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="poppins-600 text-[24px] text-[#8C00FF]">Log Files</h2>
                <p className="text-[14px]">
                  Earnr follows a standard procedure of using log files. These
                  files log visitors when they visit websites. All hosting
                  companies do this as a part of hosting services' analytics.
                  The information collected by log files include internet
                  protocol (IP) addresses, browser type, Internet Service
                  Provider (ISP), date and time stamp, referring/exit pages, and
                  possibly the number of clicks. These are not linked to any
                  personally identifiable information. The purpose of the
                  information is for analyzing trends, administering the site,
                  tracking users' movement on the website, and gathering
                  demographic information.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="poppins-600 text-[24px] text-[#8C00FF]">Third-Party Privacy Policies</h2>
                <p className="text-[14px]">
                  Earnr's Privacy Policy does not apply to other advertisers or
                  websites. Thus, we advise you to consult the respective
                  Privacy Policies of these third-party ad servers for more
                  detailed information. It may include their practices and
                  instructions about how to opt out of certain options.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="poppins-600 text-[24px] text-[#8C00FF]">Data Protection Rights under GDPR</h2>
                <p className="text-[14px]">
                  We are committed to ensuring that your data protection rights
                  are respected. Every user is entitled to the following:
                  <li>Access their personal data.</li>
                  <li>Rectify any inaccurate information.</li>
                  <li>Erase personal data, under certain conditions.</li>
                  <li>
                    Restrict processing of their personal data, under specific
                    conditions.
                  </li>
                  <li>
                    Object to our processing of their personal data, under
                    specific conditions.
                  </li>
                  <li>Request data portability, under certain conditions.</li>
                  <li>
                    Should you wish to exercise any of these rights, we have one
                    month to respond to you. Please contact us to make a
                    request.
                  </li>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="poppins-600 text-[24px] text-[#8C00FF]">Modifications to the Privacy Policy</h2>
                <p className="text-[14px]">
                  Earnr reserves the right to update this privacy policy at any
                  time. When we do, we will notify users through the website or
                  other means of communication. We encourage users to frequently
                  check this policy for any changes. If you disagree with any
                  changes, you should cease using our services, and you can
                  request that we delete your personal data, except where laws
                  require us to retain it. The then-current privacy policy
                  applies to all information we have about you at the time. Your
                  privacy is critically important to us at Earnr, and we are
                  committed to protecting it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default Privacy;
