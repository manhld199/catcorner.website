import { ThumbsUp, AmbulanceIcon as FirstAid, Sprout } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: ThumbsUp,
      title: "Quality and safety",
      description:
        "We provide you with only the highest quality food on the market",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-400",
    },
    {
      icon: FirstAid,
      title: "Healthy series",
      description:
        "We offer a variety of food options to meet your pet's special needs",
      bgColor: "bg-red-50",
      iconColor: "text-red-400",
    },
    {
      icon: Sprout,
      title: "Eco-friendly",
      description: "Made with natural ingredients and eco-friendly packaging.",
      bgColor: "bg-green-50",
      iconColor: "text-green-400",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Main features of InerCat
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-20 h-20 rounded-full ${feature.bgColor} flex items-center justify-center mb-6`}>
                <feature.icon
                  className={`w-10 h-10 ${feature.iconColor}`}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
