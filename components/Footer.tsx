export default function Footer() {
  return (
    <>
      <footer className="bg-[#6E6E6E] px-5 pt-5">
        <div className="flex flex-col md:flex-row justify-between md:gap-0 gap-4 items-start">
          <div className="flex items-center">
            {/* image div */}
            <img
              src={`${process.env.PUBLIC_URL}/Logo.png`}
              height={"80px"}
              width={"80px"}
            ></img>
            <h1
              style={{ fontFamily: "Satoshi" }}
              className="text-white font-Satoshi text-[32px] font-[700]"
            >
              Oversea
            </h1>
          </div>

          <main className="flex flex-col sm:flex-row gap-5 justify-end">
            <div>
              <h1
                style={{ fontFamily: "Satoshi" }}
                className="text-[32px] font-[700] text-white"
              >
                About
              </h1>
              <ul className="space-y-4 pl-0 text-[#C9C9C9]">
                <li className="font-Satoshi">
                  <a className="text-[#C9C9C9]" href="/about">
                    About us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h1
                style={{ fontFamily: "Satoshi" }}
                className="text-[32px] font-[700] text-white"
              >
                Contact
              </h1>
              <ul className="space-y-4 pl-0 text-[#C9C9C9]">
                <li className="font-Satoshi">sales@oversea.so</li>
              </ul>
            </div>

            <div>
              <h1
                style={{ fontFamily: "Satoshi" }}
                className="text-[32px] font-[700] text-white"
              >
                Legal
              </h1>
              <ul className="space-y-4 pl-0 text-[#C9C9C9]">
                <li>
                  <a href="/privacy" className="text-[#C9C9C9] font-Satoshi">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-[#C9C9C9] font-Satoshi">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </main>
        </div>

        <div>
          <div className="flex justify-center  md:justify-end gap-4 my-3">
            <a
              href="https://www.facebook.com/profile.php?id=61551753791585"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${process.env.PUBLIC_URL}/icon-facebook-v-1.svg`}
                alt="Facebook"
              ></img>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${process.env.PUBLIC_URL}/icon-instagram.svg`}
                alt="Instagram"
              ></img>
            </a>
            <a
              href="https://www.linkedin.com/company"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${process.env.PUBLIC_URL}/icon-linkedin.svg`}
                alt="LinkedIn"
              ></img>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${process.env.PUBLIC_URL}/icon-twitter.svg`}
                alt="Twitter"
              ></img>
            </a>
          </div>

          <p
            style={{ fontFamily: "Satoshi" }}
            className="text-center font-Satoshi text-white  text-[20px] font-[700]"
          >
            &copy; {new Date().getFullYear()} OverseaLabs LLC. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
