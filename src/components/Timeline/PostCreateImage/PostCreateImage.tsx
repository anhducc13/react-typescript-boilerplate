import React from 'react';
import { Input, Spin } from 'antd';
import styled from '@emotion/styled';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

interface PostCreateImageProps {
  showIconRemove?: boolean;
  showIconEdit?: boolean;
  showNote?: boolean;
  onClickIconRemove: () => void;
  onClickIconEdit: () => void;
  imgUrl?: string;
  note?: string;
  setNote: (val: string) => void;
  loading?: boolean;
}

const StyledWrapperImageBlock = styled.div`
  margin: 10px 0;
  border-radius: 6px;
`;

const StyledWrapperImage = styled.div`
  position: relative;
  background-color: #8a8d91;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledImage = styled.img`
  height: 240px;
  object-fit: contain;
`;

const StyledInputImage = styled(Input.TextArea)`
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: none;
`;

const StyledIconRemove = styled(CloseOutlined)`
  font-size: 16px;
  width: 30px;
  height: 30px;
  line-height: 28px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #ffffff;
  display: inline-block;
  position: absolute;
  right: 6px;
  top: 6px;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const StyledIconEdit = styled(EditOutlined)`
  font-size: 16px;
  width: 30px;
  height: 30px;
  line-height: 28px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #ffffff;
  display: inline-block;
  position: absolute;
  left: 6px;
  top: 6px;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const PostCreateImage: React.FC<PostCreateImageProps> = ({
  showIconRemove = false,
  showIconEdit = false,
  showNote = true,
  onClickIconRemove,
  onClickIconEdit,
  imgUrl = '',
  note = '',
  setNote,
  loading = false,
}: PostCreateImageProps) => {
  return (
    <StyledWrapperImageBlock>
      <Spin spinning={loading}>
        <StyledWrapperImage>
          <StyledImage alt="img" src={imgUrl} />
          {showIconRemove && <StyledIconRemove onClick={onClickIconRemove} />}
          {showIconEdit && <StyledIconEdit onClick={onClickIconEdit} />}
        </StyledWrapperImage>
        {showNote && (
          <StyledInputImage
            placeholder="Chú thích"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        )}
      </Spin>
    </StyledWrapperImageBlock>
  );
};

export default PostCreateImage;
