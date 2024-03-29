// TODO
// 맵 객체 클래스-인스턴스화
// 타입 구체화 및 any 제거

declare global {
  interface Window {
    kakao: any;
    kakaoMap: {
      map: any;
      currentPos: any;
    };
  }
}
const kakao = window.kakao;
let myMap: any = null;
let myPosMarker: any = null;
let markers: any = [];
// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

export function initalizeMap(container: HTMLElement | null) {
  const { kakao } = window;
  const initPos = new kakao.maps.LatLng(37.56646, 126.98121);
  const mapOption = {
    center: initPos, // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
    mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
  };

  const initMap = new kakao.maps.Map(container, mapOption);

  window.kakaoMap = {
    map: initMap,
    currentPos: initPos,
  };
  myMap = window.kakaoMap.map;
}

export function getMyPos() {
  return new Promise<void>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      moveMap(latitude, longitude);

      resolve();
    }, reject);
  });
}

function moveMap(latitude: number, longitude: number) {
  // 위치 갱신
  window.kakaoMap.currentPos = new kakao.maps.LatLng(latitude, longitude);

  // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
  myMap.panTo(window.kakaoMap.currentPos);

  // 확대 수준 변경
  myMap.setLevel(3);

  // 기존에 마커가 있다면 위치이동
  if (myPosMarker) {
    myPosMarker.setPosition(window.kakaoMap.currentPos);
  } else {
    // 마커 생성
    myPosMarker = new kakao.maps.Marker({
      position: window.kakaoMap.currentPos,
      draggable: true,
      map: myMap,
    });
    myPosMarker.setMap(myMap);
  }

  const infoWindow = new kakao.maps.InfoWindow({
    content:
      '<div style="width:150px;text-align:center;padding:6px 0;">위치가 부정확하다면 드래그를 통해 정확한 위치로 옮겨주세요!</div>',
  });
  infoWindow.open(myMap, myPosMarker);

  // 마커 드래그 시작시 인포윈도우 삭제
  kakao.maps.event.addListener(myPosMarker, "dragstart", () =>
    infoWindow.close()
  );

  // 마커의 드래그가 끝나면 현재 위치 갱신
  kakao.maps.event.addListener(myPosMarker, "dragend", () => {
    window.kakaoMap.currentPos = myPosMarker.getPosition();
  });
}

export function getCurrentPosByUserInput(userInput: string) {
  // 주소 - 좌표 변환 객체 생성
  const geocoder = new kakao.maps.services.Geocoder();

  return new Promise<void>((resolve, reject) => {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(userInput, (result: any, status: any) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        moveMap(result[0].y, result[0].x);

        resolve();
      } else {
        reject();
      }
    });
  });
}

export interface Result {
  id: string;
  category_name: string;
  place_name: string;
  phone: string;
  x: string;
  y: string;
}

export interface Pagination {
  current: number;
  last: number;
  totalCount: number;
  prevPage: VoidFunction;
  nextPage: VoidFunction;
  gotoFirst: VoidFunction;
  gotoLast: VoidFunction;
}

export function keywordSearch(
  keyword: string,
  distance: number,
  callback: (errMsg?: string, results?: Result[], pagination?: any) => void
): void {
  // 장소 검색 객체를 생성합니다
  const ps = new kakao.maps.services.Places(myMap);

  // 검색 옵션 객체
  const searchOption = {
    location: window.kakaoMap.currentPos,
    radius: distance,
    size: 9,
  };

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword, searchCallback, searchOption);

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function searchCallback(
    results: Result[],
    status: any,
    pagination: Pagination
  ) {
    switch (status) {
      case kakao.maps.services.Status.OK:
        // 결과 출력
        callback(undefined, results, pagination);

        // 마커 표출
        updateMarkers(results);
        break;

      // 로그인이 되어 있는 경우 키워드와 좌표를 저장합니다
      //saveData(id, keyword, currentPos);
      case kakao.maps.services.Status.ZERO_RESULT:
        callback("검색 결과가 존재하지 않습니다!");
        break;
      case kakao.maps.services.Status.ERROR:
        callback("검색 중 오류가 발생했습니다!");
        break;
    }
  }
}

function getNaverSearchUrl(placeName: string) {
  const parsedString = placeName.replace(" ", "+");

  // 네이버 검색 url
  return `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${parsedString}`;
}

// 마커 생성
function updateMarkers(places: Result[]) {
  const bounds = new kakao.maps.LatLngBounds();

  // 지도에 표시되고 있는 기존 마커를 제거합니다
  removeMarkers();

  for (const [index, place] of places.entries()) {
    // 마커를 생성하고 지도에 표시합니다
    const placePosition = new kakao.maps.LatLng(place.y, place.x);
    const marker = addMarker(placePosition, index);
    const title = place.place_name;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(placePosition);

    const openInfowindow = () => {
      displayInfowindow(marker, title);
    };

    const closeInfowindow = () => {
      infowindow.close();
      return false;
    };

    // 마커와 검색결과 항목에 mouseover 했을때
    // 해당 장소에 인포윈도우에 장소명을 표시합니다
    // mouseout 했을 때는 인포윈도우를 닫습니다
    kakao.maps.event.addListener(marker, "mouseover", openInfowindow);
    kakao.maps.event.addListener(marker, "mouseout", closeInfowindow);

    // DOM 요소에 이벤트 갱신
    document.getElementById(place.id)!.onmouseover = openInfowindow;
    document.getElementById(place.id)!.onmouseout = closeInfowindow;
    document.getElementById(place.id)!.onclick = () => {
      window.open(getNaverSearchUrl(place.place_name));
    };
  }

  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  myMap.setBounds(bounds);
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarkers() {
  for (const marker of markers) {
    marker.setMap(null);
  }
  markers = [];
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position: any, idx: number) {
  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png"; // 마커 스프라이트 이미지 URL
  const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
  const imgOptions = {
    spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
    spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
    offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
  };
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imgOptions
  );
  const marker = new kakao.maps.Marker({
    position: position, // 마커의 위치
    image: markerImage,
  });

  marker.setMap(myMap); // 지도 위에 마커를 표출합니다
  markers.push(marker); // 배열에 생성된 마커를 추가합니다

  return marker;
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker: any, title: string) {
  const html = `<div style="padding:5px;z-index:1;">${title}</div>`;

  infowindow.setContent(html);
  infowindow.open(myMap, marker);
}
