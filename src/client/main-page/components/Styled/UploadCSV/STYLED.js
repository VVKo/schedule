import styled from 'styled-components';


export const UploadCSVForm = styled.form`

  $theme:       #454cad;
  $dark-text:   #5f6982;
  display: block;
  clear: both;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;

  label {
    float: left;
    clear: both;
    width: 100%;
    padding: 2rem 1.5rem;
    text-align: center;
    background: #fff;
    border-radius: 7px;
    border: 3px solid #eee;
    transition: all .2s ease;
    user-select: none;

    &:hover {
      border-color: $theme;
    }
    &.hover {
      border: 3px solid $theme;
      box-shadow: inset 0 0 0 6px #eee;

      #start {
        i.fa {
          transform: scale(0.8);
          opacity: 0.3;
        }
      }
    }
  }

  #start {
    float: left;
    clear: both;
    width: 100%;
    &.hidden {
      display: none;
    }
    i.fa {
      font-size: 50px;
      margin-bottom: 1rem;
      transition: all .2s ease-in-out;
    }
  }
  #response {
    float: left;
    clear: both;
    width: 100%;
    &.hidden {
      display: none;
    }
    #messages {
      margin-bottom: .5rem;
    }
  }

  #file-image {
    display: inline;
    margin: 0 auto .5rem auto;
    width: auto;
    height: auto;
    max-width: 180px;
    &.hidden {
      display: none;
    }
  }

  #notimage {
    display: block;
    float: left;
    clear: both;
    width: 100%;
    &.hidden {
      display: none;
    }
  }

  progress,
  .progress {
    // appearance: none;
    display: inline;
    clear: both;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    height: 8px;
    border: 0;
    border-radius: 4px;
    background-color: #eee;
    overflow: hidden;
  }

  .progress[value]::-webkit-progress-bar {
    border-radius: 4px;
    background-color: #eee;
  }

  .progress[value]::-webkit-progress-value {
    background: linear-gradient(to right, darken($theme,8%) 0%, $theme 50%);
    border-radius: 4px;
  }
  .progress[value]::-moz-progress-bar {
    background: linear-gradient(to right, darken($theme,8%) 0%, $theme 50%);
    border-radius: 4px;
  }

  input[type="file"] {
    display: none;
  }

  div {
    margin: 0 0 .5rem 0;
    color: $dark-text;
  }
  .btn {
    display: inline-block;
    margin: .5rem .5rem 1rem .5rem;
    clear: both;
    font-family: inherit;
    font-weight: 700;
    font-size: 14px;
    text-decoration: none;
    text-transform: initial;
    border: none;
    border-radius: .2rem;
    outline: none;
    padding: 0 1rem;
    height: 36px;
    line-height: 36px;
    color: #fff;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    background: $theme;
    border-color: $theme;
    cursor: pointer;
  }
`
