import React from 'react';
import styled from '@emotion/styled';
import { CloseOutlined } from '@ant-design/icons';
import { emotion } from 'constants/common';

interface EmotionIconProps {
  type: string;
  showRemove?: boolean;
  onClickRemove?: () => void;
  onClick?: () => void;
}

const CloseIcon = styled(CloseOutlined)`
  cursor: pointer;
  position: absolute;
`;

const EmotionIcon: React.FC<EmotionIconProps> = ({
  type,
  showRemove = false,
  onClickRemove,
  ...props
}: EmotionIconProps) => {
  return (
    <div {...props} style={{ position: 'relative', display: 'inline-block' }}>
      {showRemove && <CloseIcon onClick={onClickRemove} />}
      <img
        alt="icon"
        src={emotion[type]}
        style={{ width: 50, cursor: 'pointer' }}
      />
    </div>
  );
};

export default EmotionIcon;
