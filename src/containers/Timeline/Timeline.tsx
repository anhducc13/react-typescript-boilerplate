import React, { useState } from 'react';
import { Avatar, Input, Divider } from 'antd';
import styled from '@emotion/styled';
import PostItem from 'components/Timeline/PostItem';
import ActionItems from 'components/Timeline/ActionItems';
import PostCreate from 'components/Timeline/PostCreate';
import TagSelection from 'components/Timeline/TagSelection';
import { PostUploadContextProvider } from 'contexts/PostUpload';
import { Post } from 'interfaces/post';

const StyledWrapper = styled.div`
  margin: 10px;
`;

const StyledPostCreate = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.08);
  padding: 20px 14px 12px;
  margin-bottom: 15px;
`;

const StyledInput = styled(Input)`
  border-radius: 999px;
  background-color: #f0f2f5;
  margin-left: 8px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #e4e6e9;
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

const Timeline = () => {
  const [visibleCreatePost, setVisibleCreatePost] = useState(false);
  const [visibleTagSelection, setVisibleTagSelection] = useState(false);
  const [post, setPost] = useState<Post>({});
  return (
    <PostUploadContextProvider>
      <StyledWrapper>
        <StyledPostCreate>
          <div className="d-flex">
            <Avatar
              size="large"
              src="https://lh3.googleusercontent.com/a-/AOh14GhHHZvg9GIQWaz4uf-OuAYBJXbV8nE2u8XEAShqWA=s96-c"
            />
            <StyledInput
              readOnly
              placeholder="Hôm nay có gì mới không?"
              onClick={() => setVisibleCreatePost(true)}
            />
            <PostCreate
              visibleCreatePost={visibleCreatePost}
              setVisibleCreatePost={setVisibleCreatePost}
              visibleTagSelection={visibleTagSelection}
              setVisibleTagSelection={setVisibleTagSelection}
              post={post}
              setPost={setPost}
            />
            <TagSelection
              visibleTagSelection={visibleTagSelection}
              setVisibleCreatePost={setVisibleCreatePost}
              setVisibleTagSelection={setVisibleTagSelection}
              post={post}
              setPost={setPost}
            />
          </div>
          <StyledDivider />
          <ActionItems
            visibleCreatePost={visibleCreatePost}
            setVisibleCreatePost={setVisibleCreatePost}
            setVisibleTagSelection={setVisibleTagSelection}
            post={post}
            setPost={setPost}
          />
        </StyledPostCreate>
        <PostItem />
        <PostItem />
      </StyledWrapper>
    </PostUploadContextProvider>
  );
};

export default Timeline;
