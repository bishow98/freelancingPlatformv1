import {
  Mail,
  MapPin,
  Phone,
  Star,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className=" bg-white shadow-2xl text-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center md:text-left">
              Contact us
            </h2>
            <p className="text-gray-300">
              Turning Your Visions into Victories with Work Done
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>Email - xyz@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Location - Itahari, Koshi</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>+977- 9813486759</span>
              </div>
            </div>
          </div>

          {/* Subscribe Form */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 rounded-md shadow-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
              />
              <button className="px-4 py-2 bg-white shadow-xl text-[#2B3A55] rounded-md hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-400">
              By Submitting your email, you agree to our Terms and Conditions.
            </p>
          </div>
        </div>

        {/* Rating and Social Links */}
        <div className="mt-12 py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <p>Please Rate Us!</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-yellow-400 cursor-pointer"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <p>Follow Us</p>
              <a href="#" className="hover:text-gray-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Logo and Copyright */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white text-[#2B3A55] h-10 w-10 rounded-full flex items-center justify-center font-bold">
              WD
            </div>
            <span className="font-medium">Your Task, Our Talent</span>
          </div>
          <div className="text-sm text-gray-400">
            2024 copyright • All Right Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
