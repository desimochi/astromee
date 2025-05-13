import { MessageCircleIcon, MessageSquare } from "lucide-react";

export default function FeatureGrid() {
  const features = [
    { icon: <MessageSquare className="h-7 w-7"/>, title: "Chat With Astrologers" },
    { icon: "〰️", title: "Ease of use",},
    { icon: "$", title: "Pricing like no other"},
    { icon: "☁️", title: "100% Uptime guarantee"},
    { icon: "↗️", title: "Multi-tenant Architecture" },
    { icon: "❓", title: "24/7 Customer Support" },
    { icon: "⚙️", title: "Money back guarantee" },
    { icon: "❤️", title: "And everything else" },
    { icon: "⚙️", title: "Money back guarantee"},
    { icon: "❤️", title: "And everything else"}
  ];

  return (
    <div className="">
    <section className="relative max-w-7xl mx-auto px-4 py-32">
      {/* Dotted Background Layer */}
      <div className="absolute inset-0 "/>
    
      {/* Foreground Content */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6">
        {features.map((item, idx) => {
          const isFirstCol = idx % 6 === 0;
          const isLastCol = (idx + 1) % 6 === 0;

          return (
            <div
              key={idx}
              className={`p-6 border-yellow-700 border-dashed text-center
                ${!isFirstCol ? 'border-l' : ''} 
                ${idx < 8 ? 'border-b' : ''} 
                ${!isLastCol ? 'border-r' : ''}`}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            </div>
          );
        })}
      </div>
    </section>
    </div>
  );
}
