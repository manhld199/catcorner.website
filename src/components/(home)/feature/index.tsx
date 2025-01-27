import { ThumbsUp, AmbulanceIcon as FirstAid, Sprout } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: ThumbsUp,
      title: "Chất lượng và an toàn",
      description:
        "Chúng tôi cung cấp cho bạn những sản phẩm food chất lượng cao nhất trên thị trường",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-400",
    },
    {
      icon: FirstAid,
      title: "Dòng sản phẩm lành mạnh",
      description:
        "Chúng tôi mang đến nhiều lựa chọn thức ăn để đáp ứng nhu cầu đặc biệt của thú cưng của bạn",
      iconColor: "text-red-400",
      bgColor: "bg-red-50",
    },
    {
      icon: Sprout,
      title: "Thân thiện với môi trường",
      description:
        "Được làm từ nguyên liệu tự nhiên và bao bì thân thiện với môi trường",
      bgColor: "bg-green-50",
      iconColor: "text-green-400",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Điểm nổi bật của CatCorner
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
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-black">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
