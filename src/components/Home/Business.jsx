import { motion } from "framer-motion";

const companyLogos = [
  "https://images.pexels.com/photos/258174/pexels-photo-258174.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3767673/pexels-photo-3767673.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1365795/pexels-photo-1365795.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2362155/pexels-photo-2362155.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/170809/pexels-photo-170809.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2835170/pexels-photo-2835170.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/104372/pexels-photo-104372.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3081173/pexels-photo-3081173.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1769735/pexels-photo-1769735.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4480519/pexels-photo-4480519.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3070071/pexels-photo-3070071.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/9843280/pexels-photo-9843280.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4503739/pexels-photo-4503739.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/31206348/pexels-photo-31206348/free-photo-of-modern-architecture-in-puebla-business-district.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5531004/pexels-photo-5531004.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/6763964/pexels-photo-6763964.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/4109051/pexels-photo-4109051.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/15863044/pexels-photo-15863044/free-photo-of-openai-text-on-tv-screen.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/26954172/pexels-photo-26954172/free-photo-of-lamborghini-logo-badge-on-hood-of-black-glossy-sports-car.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2532680/pexels-photo-2532680.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/698699/pexels-photo-698699.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5872350/pexels-photo-5872350.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/213084/pexels-photo-213084.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/39720/pexels-photo-39720.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3651828/pexels-photo-3651828.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/6389017/pexels-photo-6389017.jpeg?auto=compress&cs=tinysrgb&w=600",
];

export default function Business() {
  const duplicatedLogos = [...companyLogos, ...companyLogos, ...companyLogos];
  return (
    <section className="py-16 bg-gradient-to-r from-[#078aa5] to-[#03ab82]">
      <div className="text-center">
        <h2 className="w-11/12 mx-auto text-3xl md:text-5xl font-extrabold mb-16 tracking-wide text-white">
          Join the 15,000+ small and mid-sized US businesses using the GoCo
          platform
        </h2>
        <div className="overflow-hidden relative w-full">
          <motion.div
            className="flex space-x-8 w-max"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              duration: 200,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Company ${index + 1}`}
                className="w-48 h-48 rounded-md"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
