import React, { useState, useEffect } from "react";
import { IUseSelect, IUsePagination } from "./types";
import { Users } from "./User";
import Page from "./Page";
import Table from "./Table";

const useSelect = (initValue: number): IUseSelect => {
  const [value, setValue] = useState<number>(initValue);
  const onChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
    const {
      target: { value }
    } = event;
    setValue(parseInt(value));
  };

  return {
    value,
    onChange
  };
};

const Pagination = () => {
  const pageCnt = useSelect(3); // 한 화면에서 보이는 page 갯수
  const tableCnt = useSelect(2); // 한 화면에서 보이는 테이블 갯수.
  console.log("PAGE: ", pageCnt);
  useEffect(() => {
    console.log("HI");
  }, []);
  return <PaginationPresenter pageCnt={pageCnt} tableCnt={tableCnt} />;
};
const options = new Array(4);
options.fill(0, 0, 4);

const START_SCREEN = 1;
const START_CURSOR = 1;
// const PAGE_SET_OBJ = {
//   tableCnt: 1,
//   pageCnt: 5
// };

const usePagination = (
  total: number,
  defaultScreen: number,
  defaultCursor: number,
  pageCnt: number,
  tableCnt: number
): IUsePagination => {
  // const { tableCnt, pageCnt } = PAGE_SET_OBJ;
  const [pages, setPages] = useState<Array<number>>([]);
  const [screen, setScreen] = useState<number>(defaultScreen);
  const [cursor, setCursor] = useState<number>(defaultCursor);

  const currentScreenTableSize: number = screen * tableCnt * pageCnt;

  const [hasFirst, setHasFirst] = useState<boolean>(defaultScreen !== 1); // [<<]
  const [hasPrev, setHasPrev] = useState<boolean>(defaultScreen !== 1); // [<]

  const [hasNext, setHasNext] = useState<boolean>(
    currentScreenTableSize < total
  ); // [>]
  const [hasLast, setHasLast] = useState<boolean>(
    currentScreenTableSize < total
  ); // [>>]

  const onChangeCursor = (newCursor: number) => {
    setCursor(newCursor);
    return null;
  };

  const handleCursorAtPages = (newScreen: number) => {
    const newPages = [];
    const startPageNumber: number = newScreen * pageCnt - (pageCnt - 1);

    for (var i = 0; i < pageCnt; i++) {
      const pageNumber: number = startPageNumber + i;

      if ((pageNumber - 1) * tableCnt < total) {
        newPages.push(pageNumber);
      }
    }
    // First, Prev
    if (newScreen === 1) {
      setHasFirst(false);
      setHasPrev(false);
    } else {
      setHasFirst(true);
      setHasPrev(true);
    }
    // Last, Next
    const isNotMax: boolean = newScreen * (tableCnt * pageCnt) < total;
    if (isNotMax) {
      // 남은 페이지가 더있는경우,
      setHasNext(true);
      setHasLast(true);
    } else {
      setHasNext(false);
      setHasLast(false);
    }

    setPages(newPages);
  };

  const onClickArrow = (newScreen: number) => {
    let newCursor: number = 0;
    const lastPageNumber: number = newScreen * pageCnt;
    if (newScreen > screen) {
      // [ > ] 클릭,
      newCursor = lastPageNumber - (pageCnt - 1);
    } else {
      // [ < ] 클릭,
      newCursor = lastPageNumber;
    }
    setCursor(newCursor);
    setScreen(newScreen);
    handleCursorAtPages(newScreen);
    return null;
  };

  const onClickDBArrow = (isFirst: boolean) => {
    let newScreen: number = 1;
    let newCursor: number = 1;
    if (isFirst) {
      // [<<], [<] 클릭
      setHasFirst(false);
    } else {
      // [>>], [>] 클릭
      const tmpScreen = total / (pageCnt * tableCnt);
      const tmpCursor = total / tableCnt;
      if (tmpCursor % 1 !== 0) {
        // 소수점이라면 + 1해준다.
        newCursor = Math.floor(tmpCursor) + 1;
      } else {
        newCursor = tmpCursor;
      }
      if (tmpScreen % 1 !== 0) {
        // 소수점이면 + 1해준다.
        newScreen = Math.floor(tmpScreen) + 1;
      } else {
        newScreen = tmpScreen;
      }
      setHasLast(false);
    }
    setCursor(newCursor);
    setScreen(newScreen);
    handleCursorAtPages(newScreen);
    return null;
  };

  return {
    screen,
    cursor,
    hasFirst,
    hasPrev,
    hasLast,
    hasNext,
    onChangeCursor,
    onClickArrow,
    onClickDBArrow,
    pages
  };
};
const PaginationPresenter = ({ pageCnt, tableCnt }) => {
  const total = Users.length; // 전체 테이블 갯수.

  const pagination: IUsePagination = usePagination(
    total,
    START_SCREEN,
    START_CURSOR,
    pageCnt.value,
    tableCnt.value
  );
  const { cursor, onClickDBArrow } = pagination;

  // cursor가 변할때마다
  useEffect(() => {
    onClickDBArrow(true);
    console.log("변경됨");
  }, [pageCnt.value, tableCnt.value]);

  /**
   *  현재의 데이터는 임시로 배열로 만들었으며,
   *  실제로 어플에 추가시키려면, 갯수만큼 요청해서 가져오
   */
  let currentUsers: Array<any> = [];
  const startIndex: number = cursor * tableCnt.value - tableCnt.value;
  const lastIndex: number = startIndex + tableCnt.value - 1;
  // 4이면 3부터 시작,
  for (var i = startIndex; i <= lastIndex; i++) {
    if (total - 1 >= i) {
      // total = users.length이므로 -1으로 배열의 값이 있는지 없는지 확인하도록 한다.
      currentUsers[currentUsers.length] = Users[i];
    } else {
      // 만약 i가 더커버리면 Users의 길이를 넘어서므로 break!
      break;
    }
  }
  console.log("currentUsers: ", currentUsers);

  return (
    <>
      <h3>Hello, Custom Pagination Settings.</h3>
      <div className={"row"}>
        <p>
          <span>Page Count: </span>
          <select {...pageCnt}>
            {options.map((_, key) => (
              <option value={key + 1}>{key + 1}</option>
            ))}
          </select>
        </p>
        <p>
          <span>Table Count: </span>
          <select {...tableCnt}>
            {options.map((_, key) => (
              <option value={key + 1}>{key + 1}</option>
            ))}
          </select>
        </p>
      </div>
      <div className={"row"}>
        <div className={"table-box"} style={{ width: "100%" }}>
          {currentUsers.map((user, key) => (
            <Table
              key={key}
              no={user.no}
              name={user.name}
              hometown={user.hometown}
            />
          ))}
        </div>
      </div>
      <Page pagination={pagination} />
    </>
  );
};

export default Pagination;
