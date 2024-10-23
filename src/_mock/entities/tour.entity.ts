import { Tour } from 'src/_core/entities/tour.entity';

export class MockTour {
  static defaultTour: Tour = {
    id: 1,
    city: 'malaysia/johorbahrucity',
    title: '말레이시아 조호바루 부동산 투어',
    writer: 9,
    descriptions: `[
    {
      "title": "동남아의 뉴욕, 말레이시아의 수도 '쿠알라룸푸르'",
      "content": "영국으로부터의 독립을 선포한 상징적 장소 '메르데카 광장'과 쿠알라룸푸르의 과거와 현재, 미래를 볼 수 있는 '시티갤러리'가 있습니다."
    },
    {
      "title": "유네스코 세계문화유산으로 지정된 역사의 도시 '말라카'",
      "content": "과거 국제무역선이 오가던 무역 중심지, 말라카의 역사를 엿볼 수 있는 붉은 광장 '네덜란드 광장'과 말라카 해협을 지키기 위해 지어진 요새 '파모사'가 있습니다."
    },
    {
      "title": "'싱가포르'의 매력 완전 정복",
      "content": "도시 속의 정원 '가든스 바이 더 베이' 클라우드돔과 슈퍼트리 전망대, 그리고 테마파크의 섬 '센토사' 투어가 포함되어 있습니다."
    }
  ]`,
    price: '최대 4인 / 95,000원\n(1인 참가 시에도 95,000원)',
    date: `1일(4시간) / 상시, 문의 필요`,

    mainImage:
      'https://blueye.s3.ap-northeast-2.amazonaws.com/3b9bbea8-2148-475d-b568-c31f09773ae0.jpg',
    images:
      'https://blueye.s3.ap-northeast-2.amazonaws.com/071854d2-892c-4353-b508-79f0b82f3823.jpg',
  };

  static notExistTour: Tour = {
    id: 9999,
    city: 'malaysia/johorbahrucity',
    title: '말레이시아 조호바루 부동산 투어',
    writer: 9,
    descriptions: `[
    {
      "title": "동남아의 뉴욕, 말레이시아의 수도 '쿠알라룸푸르'",
      "content": "영국으로부터의 독립을 선포한 상징적 장소 '메르데카 광장'과 쿠알라룸푸르의 과거와 현재, 미래를 볼 수 있는 '시티갤러리'가 있습니다."
    },
    {
      "title": "유네스코 세계문화유산으로 지정된 역사의 도시 '말라카'",
      "content": "과거 국제무역선이 오가던 무역 중심지, 말라카의 역사를 엿볼 수 있는 붉은 광장 '네덜란드 광장'과 말라카 해협을 지키기 위해 지어진 요새 '파모사'가 있습니다."
    },
    {
      "title": "'싱가포르'의 매력 완전 정복",
      "content": "도시 속의 정원 '가든스 바이 더 베이' 클라우드돔과 슈퍼트리 전망대, 그리고 테마파크의 섬 '센토사' 투어가 포함되어 있습니다."
    }
  ]`,
    price: '최대 4인 / 95,000원\n(1인 참가 시에도 95,000원)',
    date: `1일(4시간) / 상시, 문의 필요`,

    mainImage:
      'https://blueye.s3.ap-northeast-2.amazonaws.com/3b9bbea8-2148-475d-b568-c31f09773ae0.jpg',
    images:
      'https://blueye.s3.ap-northeast-2.amazonaws.com/071854d2-892c-4353-b508-79f0b82f3823.jpg',
  };

  static tourList: Tour[] = [this.defaultTour];

  find({ where: { city } }) {
    const houses = MockTour.tourList.filter((tour) => tour.city === city);

    return houses;
  }

  findOne({ where: { id } }) {
    const [house] = MockTour.tourList.filter((tour) => tour.id === id);

    if (!house) return null;

    return house;
  }

  exists({ where: { id } }) {
    const [house] = MockTour.tourList.filter((tour) => tour.id === id);

    if (house) return true;

    return false;
  }

  create() {
    return MockTour.defaultTour;
  }

  save(data) {
    const keys = Object.keys(data);
    for (let key of keys) {
      if (!data[key].length) {
        continue;
      }
    }
    MockTour.tourList.push(MockTour.defaultTour);

    return MockTour.defaultTour;
  }

  update() {}

  delete() {
    return true;
  }
}
