"use client";

import { useState } from "react";
import * as Icons from "react-icons/fa6";

export default function SocialIcon({ link, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamically resolve the icon from react-icons/fa6
  const IconComponent = Icons[link.icon_name] || Icons.FaLink;
  
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-gray-400 transition-all duration-300 hover:scale-110 flex items-center justify-center ${className}`}
      style={{ color: isHovered ? (link.brand_color || '#ED1C24') : '' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Visit our ${link.platform_name}`}
    >
      <IconComponent className="h-[20px] w-[20px] md:h-[24px] md:w-[24px] lg:h-[28px] lg:w-[28px]" />
    </a>
  );
}
