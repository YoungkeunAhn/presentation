/*
 * 2차강의 실습 프롬프트 — 단일 소스(single source of truth)
 *
 * 이 파일 하나만 고치면 발표 슬라이드(index.html)의 프롬프트 칩과
 * 학생 배포용 모음 페이지(prompts.html)가 동시에 갱신됩니다.
 *
 * 각 항목 필드
 *  - id        : 고유 식별자 (slide의 data-prompt와 매칭)
 *  - step      : "STEP N" 표기
 *  - title     : 카드/팝오버 제목
 *  - short     : 슬라이드 칩에 표시할 짧은 이름
 *  - slide     : 이 프롬프트를 쓰는 발표 슬라이드 번호 (없으면 null)
 *  - spotlight : prompts.html에서 강조 카드로 표시할지
 *  - vars      : 사용자가 채우는 입력칸 [{name,label,placeholder}]
 *  - note      : 입력칸 안내 문구
 *  - body      : 프롬프트 본문 ({{VAR}} 자리표시자 포함)
 */
;(function () {
  const PROMPTS = [
    {
      id: 'step-1',
      step: 'STEP 1',
      title: '기획 문서 요청 프롬프트',
      short: '기획 문서',
      slide: 3,
      body: `카테고리별로 할 일을 관리하는 Todo 웹앱을 만들기 위한 짧은 기획 문서를 만들어줘.

목표:
사용자가 카테고리를 만들고, 카테고리별로 할 일(Todo)을 등록·관리하는 웹앱을 만들고 싶어.
각 할 일은 "해야 하는 날짜"를 가지고, 완료 체크를 할 수 있어야 해.
완료하지 않은 할 일은 날짜가 지나도 계속 보여야 해.
데이터는 Supabase DB에 저장하고, 마지막에는 GitHub Pages로 인터넷에 배포할 거야.

문서에 포함할 내용:
- 이 웹앱의 목적과 사용 흐름
- 필요한 데이터: 카테고리, 할 일(제목·카테고리·해야 하는 날짜·완료 여부·완료한 날짜)
- 카테고리 추가/조회 동작
- 할 일 추가/조회/완료 체크/삭제 동작
- 날짜별 화면(밀린 할 일 / 오늘 할 일)을 나누는 규칙
- 카테고리별 남은 할 일 개수와 평균 달성속도(완료한 날짜 − 해야 했던 날짜)
- 화면에서 확인해야 할 결과
- 완성 후 검증 체크리스트

문서를 저장할 때는 docs 폴더 안에 기능별 설명 문서를 따로 나누어 저장해줘.
그리고 전체 내용을 한눈에 볼 수 있는 메인 문서도 함께 만들고,
그 메인 문서에서 각 기능별 문서를 링크로 참조할 수 있게 정리해줘.
파일 이름은 기능명으로 해줘.`,
    },
    {
      id: 'step-2',
      step: 'STEP 2',
      title: 'Supabase 테이블 생성 SQL 요청 프롬프트',
      short: '테이블 SQL',
      slide: 16,
      spotlight: true,
      body: `docs 폴더의 문서를 보고, Supabase SQL Editor에서 실행할 테이블 생성 SQL을 만들어줘.

만들 테이블은 두 개야.

1) categories (카테고리)
- id : 자동 증가 기본키
- name : 카테고리 이름 (필수)
- created_at : 생성 시각 (기본값 now())

2) todos (할 일)
- id : 자동 증가 기본키
- title : 할 일 제목 (필수)
- checked : 완료 여부 (true/false, 기본값 false)
- category_id : categories 테이블의 id를 가리키는 Foreign Key
- target_date : 해야 하는 날짜
- completed_at : 완료한 날짜 (완료 전에는 비어 있음)
- created_at : 생성 시각 (기본값 now())

요청:
- todos.category_id 가 categories.id 를 참조하도록 Foreign Key 제약을 걸어줘.
- SQL Editor에 그대로 붙여넣어 한 번에 실행할 수 있는 전체 SQL을 줘.
- Row Level Security를 켜고, 초보자 실습용으로 select, insert, update, delete가
  모두 가능하도록 두 테이블 각각에 policy를 만들어줘.
- 같은 policy가 이미 있어도 다시 실행할 수 있게 drop policy if exists를 포함해줘.
- 테스트용 카테고리 2~3개와 할 일 몇 개를 넣는 INSERT 예시도 맨 아래에 넣어줘.
- 설명은 짧게 하고, 실행할 SQL 전체는 docs 폴더 안에 파일로도 저장해줘.`,
    },
    {
      id: 'step-3',
      step: 'STEP 3',
      title: '프론트엔드 화면 구현 요청 프롬프트',
      short: '프론트 구현',
      slide: 18,
      body: `docs 폴더의 문서와 방금 만든 categories, todos 테이블을 기준으로 Todo 웹앱을 만들어줘.

화면과 동작은 docs 문서에 적힌 그대로 따라줘.
(카테고리 추가·조회, 할 일 추가·조회·완료 체크·삭제, 카테고리 이름 JOIN 표시 등)
- 데이터는 categories, todos 테이블 구조에 맞춰 다루고,
  페이지를 처음 열면 저장된 데이터를 불러와 보여줘.

초보자가 따라 할 수 있게 필요한 파일, 설치 방법, 실행 방법을 순서대로 알려주고,
최종 코드는 생략하지 말고 전체를 줘.`,
    },
    {
      id: 'step-4',
      step: 'STEP 4',
      title: 'Supabase 연동 프롬프트',
      short: 'Supabase 연동',
      slide: 18,
      vars: [
        {
          name: 'PROJECT_URL',
          label: 'Project URL',
          placeholder: 'https://xxxxxxxx.supabase.co',
        },
        { name: 'ANON_KEY', label: 'anon key', placeholder: 'eyJhbGciOiJI...' },
      ],
      note:
        'Supabase 대시보드 → Settings → API 에서 두 값을 복사해 위 칸에 붙여넣고 복사를 누르면, 내 값이 채워진 연동 프롬프트가 복사됩니다. (service_role key는 절대 넣지 마세요.)',
      body: `방금 만든 Todo 앱을 아래 정보로 내 Supabase 프로젝트에 연동해줘.

Supabase 연결 정보:
- Project URL: {{PROJECT_URL}}
- anon public key: {{ANON_KEY}}

service_role key는 절대 쓰지 말고, 위 anon key만 사용해줘.
연동한 뒤에는 categories, todos 데이터가 실제 Supabase에 저장되고
다시 불러와지는지 확인할 수 있게 해줘.`,
    },
    {
      id: 'step-5',
      step: 'STEP 5',
      title: '날짜별 관리 · 통계(JOIN/View) 요청 프롬프트',
      short: '날짜·통계·View',
      slide: 27,
      body: `지금 만든 Todo 앱에 날짜별 관리와 카테고리별 통계를 추가하고 싶어.

날짜별 화면:
- 오늘 / 이전 / 다음 / 직접 선택으로 날짜를 이동할 수 있게 해줘.
- 선택한 날짜를 기준으로 화면을 "밀린 할 일"과 "오늘 할 일"로 나눠줘.
- 완료하지 않은 할 일(checked = false)은 target_date가 지나도 계속 보이게 해줘.
  (날짜를 고치지 말고, 며칠 밀렸는지 알 수 있게 원래 날짜를 그대로 둬.)

카테고리별 통계:
- 이미 불러온 목록을 프론트에서 filter, reduce로 가공해
  카테고리별 남은 할 일 개수를 보여줘.
- 평균 달성속도 = (완료한 날짜 − 해야 했던 날짜)의 평균 을 카테고리별로 계산해줘.

추가 요청:
- 매번 긴 JOIN 쿼리를 쓰지 않도록, 카테고리별 통계를 묶어주는
  category_stats View를 만드는 SQL도 함께 줘.
  (전체 개수 / 완료 개수 / 남은 개수 / 평균 달성속도)
- View를 만드는 SQL은 docs 폴더에 저장하고,
  프론트에서는 이 View를 일반 테이블처럼 조회하도록 코드를 고쳐줘.`,
    },
    {
      id: 'step-6',
      step: 'STEP 6',
      title: '검증 체크리스트 요청 프롬프트',
      short: '검증 체크리스트',
      slide: 25,
      body: `docs에 저장된 문서와 현재 결과물을 기준으로
초보자가 확인할 수 있는 검증 체크리스트를 만들어줘.

확인하고 싶은 것:
- 카테고리를 추가하면 목록에 바로 보이는지
- 할 일을 추가하면 카테고리 이름과 함께 목록에 보이는지
- 완료 체크를 켜고 끌 때 checked와 completed_at이 올바르게 바뀌는지
- 삭제 버튼이 Supabase와 화면 양쪽에서 모두 지우는지
- Supabase DB(Table Editor)에 데이터가 실제로 저장되는지
- 새로고침 후에도 데이터가 다시 보이는지
- 완료하지 않은 할 일이 날짜가 지나도 계속 보이는지
- 날짜 이동(오늘/이전/다음/선택)이 제대로 동작하는지
- 카테고리별 남은 개수와 평균 달성속도가 맞게 계산되는지
- 빈 입력값일 때 안내가 나오는지
- 모바일 화면에서 깨지지 않는지

기획 문서:
[기획 문서 붙여넣기]

현재 구현 내용:
[현재 파일 구조나 코드 붙여넣기]`,
    },
    {
      id: 'step-7',
      step: 'STEP 7',
      title: '에러 해결 요청 프롬프트',
      short: '에러 해결',
      slide: 25,
      body: `아래 에러가 나왔어.
원인을 쉽게 설명해주고, 고친 전체 코드를 다시 줘.

현재 상황:
[무엇을 하다가 에러가 났는지 적기 — 예: Supabase에 저장 버튼을 눌렀을 때]

에러 메시지:
[에러 메시지 또는 브라우저 콘솔(F12) 내용 붙여넣기]

원하는 결과:
[어떻게 작동해야 하는지 적기]

참고:
- Supabase URL과 anon key를 넣는 부분은 그대로 두고 알려줘.
- RLS(policy)나 Foreign Key 때문일 수 있으면 그 부분도 함께 점검해줘.`,
    },
    {
      id: 'step-8',
      step: 'STEP 8',
      title: 'GitHub 연동 프롬프트',
      short: 'GitHub 연동',
      slide: 35,
      body: `완성한 Todo 앱을 아래 GitHub 저장소에 연동해줘.

▼ 저장소 주소 (이 칸에 붙여넣기)
[ https://github.com/내아이디/내저장소.git ]

위 주소로 연동 → 커밋 → 푸시 순서로 진행하고,
명령어마다 한 줄로 설명해줘.
service_role key 같은 민감한 값이 올라가지 않는지도 확인해줘.`,
    },
    {
      id: 'step-9',
      step: 'STEP 9',
      title: '운영 수준 디자인 개편 요청 프롬프트',
      short: '디자인 개편',
      slide: 42,
      body: `지금 만든 앱의 디자인을 실제 운영할 수 있는 수준으로 개편하고 싶어.
지금은 사이드 프로젝트 느낌이라, 인터넷의 실제 서비스를 참고해서
정돈된 SaaS 제품처럼 보이게 만들어줘.

요청:
- 기능과 데이터 로직(app.js)은 그대로 두고, 화면(HTML 구조 + CSS)만 바꿔줘.
  (app.js가 쓰는 id/클래스는 그대로 유지해서 기능이 깨지지 않게 해줘.)
- 참고 스타일: [Notion 스타일]   ← Linear, Todoist 등 원하는 서비스로 바꿔도 됨
- 레이아웃: 좌측 사이드바 + 본문으로 이뤄진 앱 셸 구조로 만들어줘.
- 시스템 폰트, 절제된 뉴트럴 색 + 단일 액센트, 그림자 대신 얇은 경계선과 은은한 hover.
- 라이트/다크 테마를 CSS 변수로 만들고, 토글 버튼으로 전환할 수 있게 해줘.
  선택한 테마는 localStorage에 저장하고, 새로고침해도 유지되게,
  첫 방문은 시스템 설정(prefers-color-scheme)을 따르게 해줘.
- 모바일에서는 사이드바를 햄버거로 열고, 바깥 배경을 누르면 닫히게 해줘.
- 왜 그렇게 바꿨는지 핵심만 짧게 설명하고, 바뀐 전체 코드를 줘.
- 이 디자인 결정을 docs/adr 에 ADR 문서로도 한 건 남겨줘.`,
    },
    {
      id: 'step-10',
      step: 'STEP 10',
      title: '프로젝트 화면 GIF 만들기 요청 프롬프트',
      short: '화면 GIF',
      slide: 42,
      body: `완성한 앱 화면을 움직이는 GIF로 만들어서 docs 폴더에 저장해줘.

요청:
- 실제 브라우저로 페이지를 렌더링해서 화면을 캡처해줘.
- 화면을 위에서 아래로 부드럽게 스크롤하는 GIF로 만들어줘.
  (라이트 → 다크 모드로 전환되는 장면도 함께 넣어줘.)
- 데이터가 비어 보이지 않게, 예시 데이터가 채워진 상태로 보여줘.
- 기존 GIF가 있으면 지우지 말고 새 파일로 저장해줘.`,
    },
    {
      id: 'step-11',
      step: 'STEP 11',
      title: '카테고리 색상 추가 요청 프롬프트',
      short: '카테고리 색상',
      body: `카테고리별 통계와 할 일 추가 화면에 보이는 카테고리에 "색"을 추가하고 싶어.
글자색이나 배경색으로 칠하지 말고, 더 나은 방향(작은 색 점)으로 표현해줘.

요청:
- 색은 카테고리마다 정해지고, DB(categories 테이블)에 color 컬럼으로 저장해줘.
  - 기존 DB에도 적용할 수 있게 컬럼을 추가하는 마이그레이션 SQL을 docs 폴더에 따로 저장해줘.
  - color 값이 비어 있는(예전) 카테고리는 이름을 기준으로 기본색이 자동으로 정해지게 해줘.
- 사용자가 색을 직접 바꿀 수 있어야 해.
  - 사이드바 카테고리의 색 점을 누르면 팔레트가 떠서 고르게 해줘.
- 같은 카테고리는 사이드바·통계·할 일 목록·추가 드롭다운 어디서나 같은 색으로 보이게 해줘.
- 할 일 추가의 카테고리 선택은 네이티브 select라 항목 안에 색 점을 못 넣으니,
  색 점이 보이는 커스텀 드롭다운으로 바꿔줘. (app.js가 쓰는 id는 그대로 유지)
- 색은 보조 신호일 뿐이고 카테고리 이름 텍스트는 항상 함께 보이게 해줘(접근성).
- 왜 그렇게 했는지 핵심만 짧게 설명하고, 이 결정을 docs/adr 에 ADR 문서로 한 건 남겨줘.
- 관련 docs 문서(데이터 구조·카테고리 기능·통계·검증 체크리스트)도 함께 최신화해줘.`,
    },
  ]

  // {{VAR}} 자리표시자를 입력값(values[name])으로 치환한 최종 텍스트를 만든다.
  // 입력이 비어 있으면 "[여기에 ○○ 붙여넣기]" 안내 문구로 대체.
  function buildText(prompt, values) {
    let text = prompt.body
    ;(prompt.vars || []).forEach((v) => {
      const token = '{{' + v.name + '}}'
      const raw = values && values[v.name] ? String(values[v.name]).trim() : ''
      const value = raw || '[여기에 ' + (v.label || v.name) + ' 붙여넣기]'
      text = text.split(token).join(value)
    })
    return text
  }

  window.LecturePrompts = {
    list: PROMPTS,
    byId: function (id) {
      return PROMPTS.find((p) => p.id === id) || null
    },
    buildText: buildText,
  }
})()
