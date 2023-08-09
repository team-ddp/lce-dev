import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: 100%;
`;
const Page = styled.div`
  width: 100%;
  height: inherit;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled.span`
  display: inline-block;
  color: white;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 70px;
`;
const Input = styled.input`
  display: block;
  width: 420px;
  background-color: inherit;
  color: white;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  height: 50px;
  outline: none;
  border: 0;
  border-bottom: 4px solid white;
  margin-bottom: 70px;
`;

const Search = () => {
  const [nickName, setNickName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const navigate = useNavigate();
  const onSubmitSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && nickName !== "") {
      setNickName("");
      setSearchResult("검색중....");
      window.api
        .invoke("getUserAccountid", nickName)
        .then((data) => {
          console.log(data.puuid);
          window.api
            .invoke("searchRecentMatchList", data.puuid)
            .then((data) => {
              console.log(data);
              navigate(`/info`);
            });
        })
        .catch((error) => {
          console.log(error);
          console.log("닉네임 찾지못함");
          setSearchResult("해당 소환사가 존재하지 않습니다!");
        });
      console.log("Search Page press Enter");
      console.log(nickName);
    }
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };

  return (
    <Container>
      <Page>
        <Text>검색하고 싶은 소환사의 닉네임을 입력하세요</Text>
        <Input
          type="search"
          value={nickName}
          onKeyUp={onSubmitSearch}
          onChange={onChange}
          maxLength={12}
        />
        <Text>{searchResult}</Text>
      </Page>
    </Container>
  );
};

export default Search;
