import React from 'react';
import { Avatar, Input, Divider } from 'antd';
import styled from '@emotion/styled';

const StyledWrapper = styled.div`
  margin: 10px;
`;

const StyledPostCreate = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.08);
  padding: 12px 14px;
`;

const StyledInput = styled(Input)`
  border-radius: 999px;
  background-color: #f0f2f5;
  margin-left: 8px;
  cursor: pointer;
  border: none;
  outline: none;

  &:hover {
    background-color: #e4e6e9;
    outline: none;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 14px 0;
`;

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

const Timeline = () => {
  return (
    <StyledWrapper>
      <StyledPostCreate>
        <div className="d-flex">
          <Avatar
            size="large"
            src="https://lh3.googleusercontent.com/a-/AOh14GhHHZvg9GIQWaz4uf-OuAYBJXbV8nE2u8XEAShqWA=s96-c"
          />
          <StyledInput placeholder="Hôm nay có gì mới không?" />
        </div>
        <StyledDivider />
        <div className="d-flex justify-content-between">
          <StyledActionItem>
            <StyledActionItemImg
              style={{
                backgroundPosition: '0 -175px',
                backgroundImage:
                  'url(https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/p4SQVC-WLZv.png)',
              }}
            />
            <StyledActionItemText>Ảnh / Video</StyledActionItemText>
          </StyledActionItem>
          <StyledActionItem>
            <StyledActionItemImg
              style={{
                backgroundImage:
                  'url(https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/uTjltYEoZQk.png)',
              }}
            />
            <StyledActionItemText>Cảm xúc</StyledActionItemText>
          </StyledActionItem>
          <StyledActionItem>
            <StyledActionItemImg
              style={{
                backgroundImage:
                  'url(https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/kyCAf2jbZvF.png)',
                backgroundPosition: 'center',
              }}
            />
            <StyledActionItemText>Thẻ</StyledActionItemText>
          </StyledActionItem>
        </div>
      </StyledPostCreate>
    </StyledWrapper>
  );
};

export default Timeline;
