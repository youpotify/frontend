import React from 'react';
import './style.scss';

function NewPlaylist({onClose}) {
    return (
        <div className="popup-background">
        <div className="popup-container">
          <button className="close-btn" onClick={onClose}>Close</button>
        
            <div className='pop-inner-con'>
                <h2>새 재생목록</h2>
                <input defaultValue={"제목"}/>
                <input defaultValue={"설명"}/>
                <div className='range-set'>
                    <span>공개범위 설정</span>
                    <select>
                        <option>공개</option>
                        <option>비공개</option>
                    </select>
                </div>
                <div className='img-input'>
                    <span>커버 이미지 등록</span>
                    <input type="file"/>
                </div>
                <div className='btns'>
                    <button>등록</button>
                    <button>취소</button>
                </div>
            </div>
            
            
        </div>
      </div>
    );
}

export default NewPlaylist;