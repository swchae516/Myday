import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SearchBar from '../components/Diary/SearchBar'
import SearchResult from '../components/Diary/SearchResult'
import TopLiked from '../components/Diary/TopLiked'
import TopWord from '../components/Diary/TopWord'
import { Row, Col, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

function Search() {
  const [optionBool, setOptionBool] = useState(false)
  const [option, setOption] = useState('word')
  const [keyword, setKeyword] = useState('')
  const [diaryList, setDiaryList] = useState([{}])
  const { me } = useSelector((state) => state.user)
  const navigate = useNavigate()

  // console.log('diaryList: ', diaryList)

  const onWrite = (word) => {
    navigate('/my/article', { state: word })
    console.log(word)
  }

  const onMove = () => {
    navigate('/search', { replace: true })
    setKeyword('')
  }

  return (
    <div>
      <div className="search-bar" style={{ margin: '2rem auto 3rem auto', width: '90%' }}>
        <SearchBar
          optionBool={optionBool}
          setOptionBool={setOptionBool}
          option={option}
          setOption={setOption}
          keyword={keyword}
          setKeyword={setKeyword}
          diaryList={diaryList}
          setDiaryList={setDiaryList}
          me={me}
        />
      </div>
      {keyword === '' ? (
        <div>
          <TopWord
            keyword={keyword}
            setKeyword={setKeyword}
            diaryList={diaryList}
            setDiaryList={setDiaryList}
          />
          <TopLiked />
        </div>
      ) : (
        <div>
          {diaryList.length === 0 ? (
            <div>
              <h3>
                <strong>'{keyword}'</strong>에 대한 검색결과가 없습니다.
              </h3>

              <Button
                type="text"
                icon={<EditOutlined />}
                style={{ marginRight: '1rem' }}
                onClick={(e) => onWrite(keyword)}>
                해당 단어로 글쓰기
              </Button>
              <Button type="text" style={{ marginRight: '1rem' }} onClick={onMove}>
                처음으로
              </Button>
            </div>
          ) : (
            <SearchResult keyword={keyword} diaryList={diaryList} setDiaryList={setDiaryList} />
          )}
        </div>
      )}
    </div>
  )
}

export default Search
