'use client';
import { useState } from 'react';
import { Bell, ChartAreaIcon, ChatBubbleOvalLeft, Star, User } from 'lucide-react';

const BottomNav = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="fixed bottom-0 w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 text-white z-900 block sm:hidden">
      {/* Center Curve */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/80 rounded-full  flex items-center justify-center z-10">
        <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
      </div>

      <div className="flex justify-between items-center py-3 px-2 relative z-0">
        {/* Menu Items */}
        <div className="flex flex-col items-center" onClick={() => toggleMenu('models')}>
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Models</span>
          {activeMenu === 'models' && <DropdownMenu items={['Model 1', 'Model 2']} />}
        </div>

        <div className="flex flex-col items-center" onClick={() => toggleMenu('favorite')}>
          <Star className="h-6 w-6" />
          <span className="text-xs mt-1">Favorite</span>
          {activeMenu === 'favorite' && <DropdownMenu items={['Fav 1', 'Fav 2']} />}
        </div>

        <div className="flex flex-col items-center" onClick={() => toggleMenu('alerts')}>
          <Bell className="h-6 w-6" />
          <span className="text-xs mt-1">Alerts</span>
          {activeMenu === 'alerts' && <DropdownMenu items={['Alert 1', 'Alert 2']} />}
        </div>

        <div className="flex flex-col items-center" onClick={() => toggleMenu('chats')}>
          <ChartAreaIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Chats</span>
          {activeMenu === 'chats' && <DropdownMenu items={['Chat 1', 'Chat 2']} />}
        </div>
      </div>
    </div>
  );
};

const DropdownMenu = ({ items }) => (
  <div className="absolute bottom-14 bg-white text-black rounded-md shadow-md p-2 w-32 text-sm z-20">
    {items.map((item, i) => (
      <div key={i} className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
        {item}
      </div>
    ))}
  </div>
);

export default BottomNav;
