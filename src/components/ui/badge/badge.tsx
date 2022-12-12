import {eachMedia, isDesktop} from '@/common/hooks/use-media';
import {PaletteKeyType} from '@/styles';
import mixins from '@/styles/mixins';
import React, {CSSProperties} from 'react';
import styled from 'styled-components';

type BadgeProps = {
  type?: PaletteKeyType;
  children: React.ReactNode;
  padding?: CSSProperties['padding'];
  className?: string;
  desktop?: boolean;
};

const Badge = (props: BadgeProps) => {
  const desktop = isDesktop();
  return (
    <BadgeWrapper
      {...props}
      className={props.className ? `badge ${props.className}` : 'badge'}
      desktop={desktop}>
      {props.children}
    </BadgeWrapper>
  );
};

const BadgeWrapper = styled.div<BadgeProps>`
  ${mixins.flexbox('row', 'center', 'center', false)};
  width: 100%;
  max-width: fit-content;
  height: 28px;
  background-color: ${({type, theme}) => (type ? theme.colors[type] : theme.colors.surface)};
  padding: ${({padding}) => (padding ? padding : '0px 16px')};
  margin-right: ${({desktop}) => (desktop ? '15px' : '10px')};
  border-radius: 4px;
  margin-top: ${({desktop}) => !desktop && '12px'};
`;

export default Badge;
