import { MessageCircleIcon, MessageSquare } from "lucide-react";

export default function FeatureGrid() {
  const features = [
    { icon: <MessageSquare className="h-7 w-7"/>, title: "Chat With Astrologers", description: "Built for engineers, developers, dreamers, thinkers and doers." },
    { icon: "〰️", title: "Ease of use", description: "It's as easy as using an Apple, and as expensive as buying one." },
    { icon: "$", title: "Pricing like no other", description: "Our prices are best in the market. No cap, no lock, no credit card required." },
    { icon: "☁️", title: "100% Uptime guarantee", description: "We just cannot be taken down by anyone." },
    { icon: "↗️", title: "Multi-tenant Architecture", description: "You can simply share passwords instead of buying new seats." },
    { icon: "❓", title: "24/7 Customer Support", description: "We are available a 100% of the time. Atleast our AI Agents are." },
    { icon: "⚙️", title: "Money back guarantee", description: "If you don’t like EveryAI, we will convince you to like us." },
    { icon: "❤️", title: "And everything else", description: "I just ran out of copy ideas. Accept my sincere apologies" },
    { icon: "⚙️", title: "Money back guarantee", description: "If you don’t like EveryAI, we will convince you to like us." },
    { icon: "❤️", title: "And everything else", description: "I just ran out of copy ideas. Accept my sincere apologies" }
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-16 mt-20">
      {/* Dotted Background Layer */}
      <div className="absolute inset-0 "/>
    
      {/* Foreground Content */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {features.map((item, idx) => {
          const isFirstCol = idx % 4 === 0;
          const isLastCol = (idx + 1) % 4 === 0;

          return (
            <div
              key={idx}
              className={`p-6 border-gray-400 border-dashed 
                ${!isFirstCol ? 'border-l' : ''} 
                ${idx < 8 ? 'border-b' : ''} 
                ${!isLastCol ? 'border-r' : ''}`}
            >
              <div className="text-2xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-snug">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
