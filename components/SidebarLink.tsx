"use client";
import Link from "next/link";
import { Settings, User, Grid, Calendar } from "react-feather";

// This import is the reason we have to use 'useClient'
// Hooks only work on client components
// usePathName Hook allows you to read the current URL pathname from a Client Component
import { usePathname } from "next/navigation";
import clsx from "clsx";

const icons = { Settings, User, Grid, Calendar };

const SidebarLink = ({ link }) => {
  const pathname = usePathname();
  //isActive doesn't change on an interaction, so no need to store in state
  //when path changes it will rerender anyway
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  } 
  
  // A server component cannot pass non-serialisable props to a client component, only JSON, HTML or CSS can be serilasied and sent across a network
  // A component is a function and therefore cannot be serilasied
  // We therefore have to it down as a string and covert to a component on the client side
  // If all components were client side then Link would already know what component to render, we wouldn't have to map to it in this way
  // On the server the code doesn't know what to render in the client component, and therefore we cannot pass it down a function / component
  // The Client Component stuff is happening after the network request is made

  const Icon = icons[link.icon];

  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SidebarLink;