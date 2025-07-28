import React from "react";
import styled from "styled-components";

const Like = () => {
  return (
    <StyledWrapper>
      <div className="con-like">
        <input
          className="like"
          type="checkbox"
          title="اضافه کردن به محصولات مورد علاقه"
        />
        <div className="checkmark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="outline"
            viewBox="0 0 24 24"
          >
            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="filled"
            viewBox="0 0 24 24"
          >
            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={100}
            width={100}
            className="celebrate"
          >
            <polygon className="poly" points="10,10 20,20" />
            <polygon className="poly" points="10,50 20,50" />
            <polygon className="poly" points="20,80 30,70" />
            <polygon className="poly" points="90,10 80,20" />
            <polygon className="poly" points="90,50 80,50" />
            <polygon className="poly" points="80,80 70,70" />
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .con-like {
    --red: rgb(255, 50, 50);
    --zinc: rgb(85, 85, 95);
    position: relative;
    width: 1.2rem;
    height: 1.2rem;
  }

  .con-like .like {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 20;
    cursor: pointer;
  }

  .con-like .checkmark {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .con-like .outline {
    fill: var(--zinc);
    position: absolute;
    outline-style: none;
  }

  .con-like .filled {
    fill: var(--red);
    position: absolute;
  }

  .con-like .filled {
    animation: kfr-filled 0.5s;
    display: none;
  }

  .con-like .celebrate {
    position: absolute;
    animation: kfr-celebrate 0.5s;
    animation-fill-mode: forwards;
    display: none;
  }

  .con-like .poly {
    stroke: var(--red);
    fill: var(--red);
  }

  .con-like .like:checked ~ .checkmark .filled {
    display: block;
  }

  .con-like .like:checked ~ .checkmark .celebrate {
    display: block;
  }

  @keyframes kfr-filled {
    0% {
      opacity: 0;
      transform: scale(0);
    }

    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }

  @keyframes kfr-celebrate {
    0% {
      transform: scale(0);
    }

    50% {
      opacity: 0.8;
    }

    100% {
      transform: scale(1.2);
      opacity: 0;
      display: none;
    }
  }
`;

export default Like;
