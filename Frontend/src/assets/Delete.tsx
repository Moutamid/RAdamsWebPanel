import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => {
  const { stroke } = props;
  return (
    <svg width={100} height={100} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.5 15H14.1667M14.1667 15H27.5M14.1667 15V26.6667C14.1667 27.1087 14.3423 27.5326 14.6548 27.8452C14.9674 28.1578 15.3913 28.3334 15.8333 28.3334H24.1667C24.6087 28.3334 25.0326 28.1578 25.3452 27.8452C25.6577 27.5326 25.8333 27.1087 25.8333 26.6667V15H14.1667ZM16.6667 15V13.3334C16.6667 12.8913 16.8423 12.4674 17.1548 12.1548C17.4674 11.8423 17.8913 11.6667 18.3333 11.6667H21.6667C22.1087 11.6667 22.5326 11.8423 22.8452 12.1548C23.1577 12.4674 23.3333 12.8913 23.3333 13.3334V15M18.3333 19.1667V24.1667M21.6667 19.1667V24.1667"
        stroke={stroke}
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default SVGComponent;
