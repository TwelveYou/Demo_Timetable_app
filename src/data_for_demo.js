export let boards_demo = [
    {
      'id':0,
      name_board:"Табло 1",
      link_board:'t1',
      city:'г. Москва',
      street:'ул. Ленина',
      number_house:'57',
      place:'Фойе, рядом с гардеробом'
    },
    {
      id:1,
      name_board:"Табло 2",
      link_board:'t2',
      city:'г. Нью Йорк',
      street:'ул. Главная',
      number_house:'21',
      place:'Напротив входа'
    },
    {
      id:2,
      name_board:"Табло 3",
      link_board:'t3',
      city:'г. Лондон',
      street:'ул. Бейкер',
      number_house:'77',
      place:'Около администратора'
    },
    {
      id:3,
      name_board:"Табло 4",
      link_board:'t4',
      city:'г. Лондон',
      street:'ул. Бейкер',
      number_house:'77',
      place:'Около администратора'
    },    
  ];

  export let doctors_demo = 
  [
    [// Табло 1
      {
        id: 1,
        order:1,
        name:"Светлана",
        lastname:"Александровна",
        surname:"Осташкова",
        speciality:"терапевт",
        department:'Терапевтическое отделение №1',
        station:1, // Отделение
        cabinet:115, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 2,
        order:2,
        name:"Ольга",
        lastname:"Сергеевна",
        surname:"Бойс",
        speciality:"терапевт",
        department:'Терапевтическое отделение №1',
        station:1, // Отделение
        cabinet:136, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: false},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 3,
        order:3,
        name:"Мария",
        lastname:"Александровна",
        surname:"Осипова",
        speciality:"терапевт",
        department:'Терапевтическое отделение №1',
        station:22, // Отделение
        cabinet:216, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 4,
        order:4,
        name:"Валентина",
        lastname:"Борисовна",
        surname:"Щукова",
        speciality:"хирург",
        department:'Терапевтическое отделение №1',
        station:13, // Отделение
        cabinet:117, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 7,
        order:5,
        name:"Алла",
        lastname:"Александровна",
        surname:"Гуркова",
        speciality:"терапевт",
        department:'Терапевтическое отделение №1',
        station:11, // Отделение
        cabinet:111, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      }     
    ],//-----------------------------------------------------------------------------------------------------
    [// Табло 2
      {
        id: 8,
        order:1,
        name:"Варвара",
        lastname:"Кузнецова",
        surname:"Вадимовна",
        speciality:"хирург",
        department:'Терапевтическое отделение №2',
        station:1, // Отделение
        cabinet:423, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 9,
        order:2,
        name:"Эдуард",
        lastname:"Сергеевна",
        surname:"Станиславович",
        speciality:"хирург",
        department:'Терапевтическое отделение №2',
        station:1, // Отделение
        cabinet:412, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: false},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 10,
        order:3,
        name:"Нина",
        lastname:"Дмитриевна",
        surname:"Кошелева",
        speciality:"хирург",
        department:'Терапевтическое отделение №2',
        station:22, // Отделение
        cabinet:411, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 11,
        order:4,
        name:"Роман",
        lastname:"Геннадьевич",
        surname:"Романов",
        speciality:"хирург",
        department:'Терапевтическое отделение №2',
        station:13, // Отделение
        cabinet:409, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 12,
        order:5,
        name:"Константин",
        lastname:"Александрович",
        surname:"Полтов",
        speciality:"хирург",
        department:2,
        station:11, // Отделение
        cabinet:406, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 13,
        order:6,
        name:"Виталий",
        lastname:"Вячеславович",
        surname:"Полушуба",
        speciality:"хирург",
        department:'Терапевтическое отделение №2',
        station:11, // Отделение
        cabinet:405, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },    
      {
        id: 14,
        order:7,
        name:"Петр",
        lastname:"Петрович",
        surname:"Дайнеко",
        speciality:"хирург",
        department:'Терапевтическое отделение №2',
        station:11, // Отделение
        cabinet:401, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true}
        ]
      }   
    ],     //-----------------------------------------------------------------------------------------------------     
    [// Табло 3
      {
        id: 18,
        order:1,
        name:"Светлана",
        lastname:"Алексеевна",
        surname:"Яковенко",
        speciality:"терапевт",
        department:'Терапевтическое отделение №3',
        station:1, // Отделение
        cabinet:366, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 15,
        order:2,
        name:"Олег",
        lastname:"Борисович",
        surname:"Иванив",
        speciality:"терапевт",
        department:'Терапевтическое отделение №3',
        station:22, // Отделение
        cabinet:368, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 22,
        order:3,
        name:"Руслан",
        lastname:"Петрович",
        surname:"Игнатьев",
        speciality:"хирург",
        department:'Терапевтическое отделение №3',
        station:13, // Отделение
        cabinet:369, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      },
      {
        id: 21,
        order:4,
        name:"Кирилл",
        lastname:"Виталиевич",
        surname:"Ширяев",
        speciality:"терапевт",
        department:2,
        station:11, // Отделение
        cabinet:370, // Кабинет
        date_birthday: '1970-03-02',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: true},
          {start_work:"8:00", finish_work:"13:00", is_work_day: false}
        ]
      }     
    ],//-----------------------------------------------------------------------------------------------------
    [// Табло 4
      //ничего нет
    ]
  ];
  
  export let users_demo = [
    {
        'id':0 ,
        username: 'admin',  
        password: 'admin',  
        admin: true,
        surname: "Администраторов",
        name:"Админ",
        second_name:"Петрович",
        birthday:'1991-12-01',
        board_list:[]
    },
    {
        id:1,
        username: 'user1',  
        password: 'qwe123',
        admin: false,  
        surname:"Тестов",
        name:"Иван",
        second_name:"Иванович",
        birthday:"1990-01-01",
        board_list:[0,1,3] 
    },
    {
        id:2,    
        username: 'user2',  
        password: '1', 
        admin: true, 
        surname:"Пробников",
        name:"Олег",
        second_name:"Олегович",
        birthday:"1989-03-15",
        board_list:[1,2]
    },
    {
      id:7,    
      username: 'user3', 
      password: 'leg', 
      admin: false,  
      surname:"Панин",
      name:"Олег",
      second_name:"Павлович",
      birthday:"1989-03-15",
      board_list:[0]


  }      
  ];