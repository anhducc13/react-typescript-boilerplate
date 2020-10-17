import React from 'react';
import { Modal, Row, Col } from 'antd';
import styled from '@emotion/styled';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { tags } from 'constants/common';
import { Post } from 'interfaces';

const StyledModalTagSelection = styled(Modal)`
  .ant-modal-close {
    left: 0;
    &:focus {
      outline: none;
    }
    .ant-modal-close-x {
      background-color: #e4e6eb;
      border-radius: 999px;
      margin-top: 8px;
      margin-left: 8px;
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

const StyledTitleModal = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

const StyledImage = styled.div`
  height: 80pt;
  color: #fff;
  font-size: 15pt;
  background-size: 500px;
  background-blend-mode: darken;
  -webkit-text-stroke-width: 0.1px;
  -webkit-text-stroke-color: #000;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  outline: none !important;
  background-position: 50%;
  cursor: pointer;
  border-radius: 10px !important;
  box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.08);
  margin-top: 10px;
  margin-bottom: 10px;
`;

interface TagSelectionProps {
  visibleTagSelection: boolean;
  setVisibleCreatePost: (val: boolean) => void;
  setVisibleTagSelection: (val: boolean) => void;
  post: Post;
  setPost: (val: Post) => void;
}

const TagSelection: React.FC<TagSelectionProps> = ({
  visibleTagSelection,
  setVisibleCreatePost,
  setVisibleTagSelection,
  post,
  setPost,
}: TagSelectionProps) => {
  const handleBack = () => {
    setVisibleCreatePost(true);
    setVisibleTagSelection(false);
  };

  const renderedTag = Object.keys(tags).map(key => (
    <Col key={key} md={{ span: 24 }} lg={{ span: 12 }}>
      <StyledImage
        onClick={() => {
          setPost({ ...post, tag: key });
          handleBack();
        }}
        style={{
          backgroundImage: `url(${tags[key].img})`,
        }}
      >
        <div>{tags[key].text}</div>
      </StyledImage>
    </Col>
  ));
  return (
    <StyledModalTagSelection
      title={<StyledTitleModal>Bạn muốn nói về điều gì?</StyledTitleModal>}
      visible={visibleTagSelection}
      footer={null}
      onCancel={handleBack}
      closeIcon={<ArrowLeftOutlined />}
    >
      <Row gutter={12}>{renderedTag}</Row>
    </StyledModalTagSelection>
  );
};

export default TagSelection;
