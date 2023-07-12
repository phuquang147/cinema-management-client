import FsLightbox from "fslightbox-react";
import { FC, useEffect, useState } from "react";

type LightBoxProps = {
  showLightBox: boolean;
  slideNumber: number;
  sources: string[];
  onClose: () => void;
};

const LightBox: FC<LightBoxProps> = ({
  showLightBox,
  slideNumber,
  sources,
  onClose,
}) => {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    number: 0,
  });

  useEffect(() => {
    setLightboxController({
      toggler: showLightBox,
      number: slideNumber,
    });
  }, [showLightBox, slideNumber]);

  return showLightBox ? (
    <FsLightbox
      openOnMount={true}
      slide={lightboxController.number}
      sources={sources}
      onClose={() => onClose()}
      svg={{
        toolbarButtons: {
          close: {
            d: "M7.34314575,3.10050506 L12.9998254,8.75682541 L18.6568542,3.10050506 C19.8284271,1.92893219 21.7279221,1.92893219 22.8994949,3.10050506 C24.0710678,4.27207794 24.0710678,6.17157288 22.8994949,7.34314575 L17.2418254,12.9998254 L22.8994949,18.6568542 C24.0710678,19.8284271 24.0710678,21.7279221 22.8994949,22.8994949 C21.7279221,24.0710678 19.8284271,24.0710678 18.6568542,22.8994949 L12.9998254,17.2418254 L7.34314575,22.8994949 C6.17157288,24.0710678 4.27207794,24.0710678 3.10050506,22.8994949 C1.92893219,21.7279221 1.92893219,19.8284271 3.10050506,18.6568542 L8.75682541,12.9998254 L3.10050506,7.34314575 C1.92893219,6.17157288 1.92893219,4.27207794 3.10050506,3.10050506 C4.27207794,1.92893219 6.17157288,1.92893219 7.34314575,3.10050506 Z",
          },
        },
        slideButtons: {
          previous: {
            width: "13px",
            height: "20px",
            d: "M10.8367585,2.57818637 L10.8549459,2.59637382 L10.8549459,2.59637382 C11.3470329,3.09877779 11.3470329,3.90244954 10.8549459,4.40485351 L5.15661713,10.2211227 L10.8549459,16.0387973 C11.3470329,16.5412013 11.3470329,17.344873 10.8549459,17.847277 C10.3758479,18.3364196 9.59093381,18.3445624 9.10179117,17.8654644 C9.09566596,17.859465 9.08960315,17.8534022 9.08360373,17.847277 L2.58868238,11.2161848 C2.31992718,10.9417949 2.19795366,10.5775417 2.22276183,10.2215835 C2.19795366,9.86610913 2.31992718,9.5018559 2.58868238,9.22746604 L9.08360373,2.59637382 C9.56270172,2.10723118 10.3476158,2.09908838 10.8367585,2.57818637 Z",
          },
          next: {
            width: "13px",
            height: "20px",
            d: "M4.34183713,2.57818637 L4.36002457,2.59637382 L4.36002457,2.59637382 L10.8549459,9.22746604 C11.1237011,9.5018559 11.2456746,9.86610913 11.2208665,10.2220673 C11.2456746,10.5775417 11.1237011,10.9417949 10.8549459,11.2161848 L4.36002457,17.847277 C3.88092658,18.3364196 3.09601247,18.3445624 2.60686983,17.8654644 L2.58868238,17.847277 L2.58868238,17.847277 C2.09659538,17.344873 2.09659538,16.5412013 2.58868238,16.0387973 L8.28561713,10.2211227 L2.58868238,4.40485351 C2.09659538,3.90244954 2.09659538,3.09877779 2.58868238,2.59637382 C3.06778037,2.10723118 3.85269449,2.09908838 4.34183713,2.57818637 Z",
          },
        },
      }}
    />
  ) : null;
};

export default LightBox;
