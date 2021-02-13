import React, { useState, useEffect } from 'react';
import { usePrevious, useMeasure } from '../../utils/hooks';
import { useSpring, animated } from 'react-spring';
import { Frame, Title, Content, Header, IconWrapper } from './tree-menu.style';
import { Button } from '../../components/button/button';
import Image from '../../components/image/image';
import { ArrowNext } from '../../assets/icons/ArrowNext';
import * as icons from '../../assets/icons/category-icons';

const Tree = React.memo(
  ({
    children,
    name,
    icon,
    // isOpen,
    onClick,
    dropdown,
    onToggleBtnClick,
    depth,
    defaultOpen = false,
  }) => {
    const [isOpen, setOpen] = useState(defaultOpen);
    useEffect(() => {
      setOpen(defaultOpen);
    }, [defaultOpen]);
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, opacity, transform } = useSpring({
      from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
      },
    });
    // const Icon = icon ? Icons[icon] : depth === 'child' ? Icons['Minus'] : null;
    // const Icon = icon ? Icons[icon] : null;
    const Icon = ({ iconName, style }) => {
      const TagName = icons[iconName];
      return !!TagName ? (
        <TagName style={style} />
      ) : (
        <p>Invalid icon {iconName}</p>
      );
    };
    return (
      <Frame depth={depth}>
        <Header open={isOpen} depth={depth} className={depth}>
        {depth === "parent" ? (
          <IconWrapper depth={depth}>
              <img  src={"https://www.ifamilymart.com.bd/ifm/assets/product_image/banner/" + icon} />
            </IconWrapper>
        ): (
          <IconWrapper depth={depth}>
            </IconWrapper>
        )}
            
        
          <Title onClick={onClick}>{name}</Title>

          {dropdown === true && (
            <Button
              onClick={() => setOpen(!isOpen)}
              variant="text"
              className="toggleButton"
            >
              <ArrowNext width="16px" />
            </Button>
          )}
        </Header>
        <Content
          style={{
            opacity,
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}
        >
          <animated.div style={{ transform }} {...bind} 
          children={children}
           />
        </Content>
      </Frame>
    );
  }
);

export const TreeMenu = ({
  data,
  className,
  onClick,
  active,
}) => {
  const handler = (children) => {
    return children.map((subOption) => {
      // console.log(subOption);
      if (!subOption.sub_menu) {
        return (
          <Tree
            key={subOption.subproduct_type}
            name={subOption.subproduct_type}
            icon={subOption.icon}
            depth="child"
            onClick={() => onClick(subOption.subtype_id , 'subtype')}
            defaultOpen={active === subOption.subtype_id}
          />
        );
      }
      // console.log(subOption.type_id);
      return (
        <Tree
          key={subOption.product_type}
          name={subOption.product_type}
          icon={subOption.type_icon}
          dropdown={!subOption.sub_menu.length ? false : true}
          depth="parent"
          onClick={() => onClick(subOption.type_id, 'productType')}
          defaultOpen={
            active === subOption.type_id ||
            subOption.sub_menu.some((item) => item.type_id === active)
          }
        >
          {handler(subOption.sub_menu)}
        </Tree>
      );
    });
  };
  return <>{handler(data)}</>;
};
