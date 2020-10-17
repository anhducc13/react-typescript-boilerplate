import React, { useRef, useState } from 'react';
import { Tooltip, Popover } from 'antd';
import styled from '@emotion/styled';
import { emotion } from 'constants/common';
import EmotionIcon from '../EmotionIcon';
import { usePostUpload } from 'contexts/PostUpload';
import { Post, PostImage } from 'interfaces';
import { v4 as uuid } from 'uuid';

const StyledActionItem = styled.div`
  flex: 1;
  cursor: pointer;
  display: flex;
  padding: 6px 10px;
  border-radius: 8px;
  justify-content: center;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const StyledActionItemImg = styled.i`
  background-size: auto;
  background-repeat: no-repeat;
  display: inline-block;
  height: 24px;
  width: 24px;
`;

const StyledActionItemText = styled.span`
  color: rgb(101, 103, 107);
  font-size: 15px;
  font-weight: 600;
  line-height: 27px;
  margin-left: 4px;
`;

interface ActionItemsProps {
  showText?: boolean;
  visibleCreatePost: boolean;
  setVisibleCreatePost: (val: boolean) => void;
  setVisibleTagSelection: (val: boolean) => void;
  post: Post;
  setPost: (val: Post) => void;
}

const ActionItems: React.FC<ActionItemsProps> = ({
  showText = true,
  visibleCreatePost,
  setVisibleCreatePost,
  setVisibleTagSelection,
  post,
  setPost,
}: ActionItemsProps) => {
  const [visibleEmotion, setVisibleEmotion] = useState(false);
  const { onUploadImage } = usePostUpload();
  const fileUploader = useRef<any>(null);
  const listEmotion = Object.keys(emotion).map(key => (
    <EmotionIcon
      type={key}
      key={key}
      onClick={() => {
        setVisibleEmotion(false);
        setPost({ ...post, emotion: key });
        if (!visibleCreatePost) {
          setVisibleCreatePost(true);
        }
      }}
    />
  ));
  const handleSelectTag = () => {
    setVisibleCreatePost(false);
    setVisibleTagSelection(true);
  };

  const handleOpenUploadfile = () => {
    fileUploader.current.click();
  };

  const handleUploadfile = (e: any) => {
    setVisibleCreatePost(true);
    const files = e.target.files;
    onUploadImage(files[0]).then((res: any) => {
      const newImage = {
        id: uuid(),
        imgUrl: res?.data?.data?.link,
        note: '',
      } as PostImage;
      const newImages = post.images || [];
      newImages.push(newImage);
      setPost({
        ...post,
        images: newImages,
      });
    });
  };

  return (
    <div className="d-flex justify-content-between">
      <input
        type="file"
        ref={fileUploader}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleUploadfile}
      />
      {showText ? (
        <>
          <StyledActionItem onClick={handleOpenUploadfile}>
            <StyledActionItemImg
              style={{
                backgroundPosition: '0 -175px',
                backgroundImage:
                  'url(https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/p4SQVC-WLZv.png)',
              }}
            />
            <StyledActionItemText>Ảnh / Video</StyledActionItemText>
          </StyledActionItem>
          <Popover
            visible={visibleEmotion}
            onVisibleChange={visible => {
              setVisibleEmotion(visible);
            }}
            title={null}
            content={listEmotion}
            trigger="click"
          >
            <StyledActionItem>
              <StyledActionItemImg
                style={{
                  backgroundImage:
                    'url(https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/uTjltYEoZQk.png)',
                }}
              />
              <StyledActionItemText>Cảm xúc</StyledActionItemText>
            </StyledActionItem>
          </Popover>
          <StyledActionItem onClick={handleSelectTag}>
            <StyledActionItemImg
              style={{
                backgroundImage:
                  'url(https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/kyCAf2jbZvF.png)',
                backgroundPosition: 'center',
              }}
            />
            <StyledActionItemText>Thẻ</StyledActionItemText>
          </StyledActionItem>
        </>
      ) : (
        <>
          <Tooltip title="Ảnh / Video" placement="bottom">
            <StyledActionItem onClick={handleOpenUploadfile}>
              <StyledActionItemImg
                style={{
                  backgroundPosition: '0 -175px',
                  backgroundImage:
                    'url(https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/p4SQVC-WLZv.png)',
                }}
              />
            </StyledActionItem>
          </Tooltip>
          <Popover
            visible={visibleEmotion}
            onVisibleChange={visible => {
              setVisibleEmotion(visible);
            }}
            title={null}
            content={listEmotion}
            trigger="click"
          >
            <Tooltip title="Cảm xúc" placement="bottom">
              <StyledActionItem>
                <StyledActionItemImg
                  style={{
                    backgroundImage:
                      'url(https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/uTjltYEoZQk.png)',
                  }}
                />
              </StyledActionItem>
            </Tooltip>
          </Popover>

          <Tooltip title="Thẻ" placement="bottom">
            <StyledActionItem onClick={handleSelectTag}>
              <StyledActionItemImg
                style={{
                  backgroundImage:
                    'url(https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/kyCAf2jbZvF.png)',
                  backgroundPosition: 'center',
                }}
              />
            </StyledActionItem>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default ActionItems;
