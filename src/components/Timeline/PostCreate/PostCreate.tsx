import React, { useMemo } from 'react';
import { Modal, Button, Input, Divider, Tag } from 'antd';
import styled from '@emotion/styled';
import EmotionIcon from '../EmotionIcon';
import ActionItems from '../ActionItems';
import PostCreateImage from '../PostCreateImage';
import { tags } from 'constants/common';
import { usePostUpload } from 'contexts/PostUpload';
import { Post } from 'interfaces';

const StyledModalCreatePost = styled(Modal)`
  .ant-modal-close {
    &:focus {
      outline: none;
    }
    .ant-modal-close-x {
      background-color: #e4e6eb;
      border-radius: 999px;
      margin-top: 8px;
      margin-right: 8px;
      width: 36px;
      height: 36px;
      line-height: 32px;

      &:hover {
        background-color: #d8dadf;
      }
    }
  }

  .ant-modal-body {
    padding: 12px;
  }
`;

const StyledScroll = styled.div`
  max-height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const StyledTitleModal = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  .ant-tag {
    font-weight: 300;
    .anticon {
      vertical-align: 0;
    }
  }
`;

const StyledButtonPublish = styled(Button)`
  margin-top: 8px;
  border-radius: 4px;
`;

const StyleInputTitle = styled(Input)`
  background-color: #fffff;
  border: none;

  &:hover {
    outline: none;
    box-shadow: unset !important;
  }
  &:focus {
    box-shadow: unset !important;
  }
`;

const StyledInputContent = styled(Input.TextArea)`
  margin: 10px 0;
  &:hover {
    outline: none;
    box-shadow: unset !important;
  }
  &:focus {
    box-shadow: unset !important;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 14px 0;
`;

interface PostCreateProps {
  visibleCreatePost: boolean;
  setVisibleCreatePost: (val: boolean) => void;
  visibleTagSelection: boolean;
  setVisibleTagSelection: (val: boolean) => void;
  post: Post;
  setPost: (val: Post) => void;
}

const PostCreate: React.FC<PostCreateProps> = ({
  visibleCreatePost,
  setVisibleCreatePost,
  setVisibleTagSelection,
  post,
  setPost,
}: PostCreateProps) => {
  const { uploading } = usePostUpload();
  const displayTag = useMemo<any>(() => {
    if (post?.tag) {
      const tag = Object.keys(tags).find(el => el === post?.tag);
      if (tag) {
        return tags[tag];
      }
    }
    return null;
  }, [post?.tag]);

  const displayImages = useMemo(() => {
    if (post?.images?.length) {
      return post.images;
    } else {
      return [];
    }
  }, [post?.images]);

  const disabled = !Object.keys(post).length || !post.title;

  return (
    <StyledModalCreatePost
      title={
        <StyledTitleModal>
          Viết nhật ký{' '}
          {displayTag && (
            <>
              {' - '}
              <Tag
                color="#108ee9"
                closable
                onClose={() => setPost({ ...post, tag: '' })}
              >
                {displayTag.text}
              </Tag>
            </>
          )}
        </StyledTitleModal>
      }
      visible={visibleCreatePost}
      footer={null}
      onCancel={() => setVisibleCreatePost(false)}
    >
      <StyledScroll>
        <StyleInputTitle
          placeholder="Có gì mới không?"
          prefix={
            post?.emotion ? (
              <EmotionIcon
                type={post.emotion}
                showRemove
                onClickRemove={() => setPost({ ...post, emotion: '' })}
              />
            ) : null
          }
          value={post.title}
          onChange={e => {
            setPost({
              ...post,
              title: e.target.value,
            });
          }}
        />
        <StyledDivider style={{ margin: '0 8px' }} />
        <StyledInputContent
          bordered={false}
          autoSize={{ minRows: 5, maxRows: 10 }}
          placeholder="Thêm nội dung cho kỷ niệm này..."
          value={post.content}
          onChange={e => {
            setPost({
              ...post,
              content: e.target.value,
            });
          }}
        />
        {displayImages.map((item: any) => (
          <PostCreateImage
            key={item.imgUrl}
            note={item.note}
            setNote={(value: string) => {
              const newImages = post.images?.map(el => {
                if (el.id === item.id) {
                  return {
                    ...el,
                    note: value,
                  };
                }
                return el;
              });
              setPost({ ...post, images: newImages });
            }}
            onClickIconEdit={() => {}}
            onClickIconRemove={() => {
              const newImages = post.images?.filter(el => el.id !== item.id);
              setPost({ ...post, images: newImages });
            }}
            showIconRemove
            imgUrl={item.imgUrl}
          />
        ))}
        {uploading && (
          <PostCreateImage
            note=""
            setNote={() => {}}
            onClickIconEdit={() => {}}
            onClickIconRemove={() => {}}
            loading
            showNote={false}
          />
        )}
      </StyledScroll>
      <ActionItems
        showText={false}
        visibleCreatePost={visibleCreatePost}
        setVisibleCreatePost={setVisibleCreatePost}
        setVisibleTagSelection={setVisibleTagSelection}
        post={post}
        setPost={setPost}
      />
      <StyledButtonPublish block type="primary" disabled={disabled}>
        Tạo
      </StyledButtonPublish>
    </StyledModalCreatePost>
  );
};

export default PostCreate;
