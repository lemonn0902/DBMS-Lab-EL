-- ==========================
-- EXPANDED SAMPLE DATA FOR DRIVER
-- ==========================

INSERT INTO
    driver (
        driver_id,
        name,
        license_no,
        join_date,
        experience_years,
        contact_no,
        current_status
    )
VALUES (
        1,
        'Ravi Kumar',
        'KA01L12345',
        '2018-05-10',
        6,
        '9876543210',
        'Active'
    ),
    (
        2,
        'Manoj R',
        'KA02L54321',
        '2019-03-12',
        5,
        '9123456780',
        'Active'
    ),
    (
        3,
        'Arun S',
        'KA03L67890',
        '2020-01-20',
        4,
        '9988776655',
        'Inactive'
    ),
    (
        4,
        'Suresh Patel',
        'KA04L11111',
        '2017-08-15',
        7,
        '9876543211',
        'Active'
    ),
    (
        5,
        'Vijay Kumar',
        'KA05L22222',
        '2019-06-20',
        5,
        '9876543212',
        'Active'
    ),
    (
        6,
        'Prakash Reddy',
        'KA06L33333',
        '2018-11-05',
        6,
        '9876543213',
        'Active'
    ),
    (
        7,
        'Ramesh Gowda',
        'KA07L44444',
        '2020-02-14',
        4,
        '9876543214',
        'Active'
    ),
    (
        8,
        'Krishna Murthy',
        'KA08L55555',
        '2016-09-30',
        8,
        '9876543215',
        'Active'
    ),
    (
        9,
        'Naveen Sharma',
        'KA09L66666',
        '2021-01-10',
        3,
        '9876543216',
        'Active'
    ),
    (
        10,
        'Mahesh Rao',
        'KA10L77777',
        '2019-04-25',
        5,
        '9876543217',
        'Active'
    ),
    (
        11,
        'Ganesh Bhat',
        'KA11L88888',
        '2018-07-12',
        6,
        '9876543218',
        'Active'
    ),
    (
        12,
        'Deepak Singh',
        'KA12L99999',
        '2020-03-18',
        4,
        '9876543219',
        'Active'
    ),
    (
        13,
        'Sanjay Kumar',
        'KA13L10101',
        '2017-12-05',
        7,
        '9876543220',
        'Active'
    ),
    (
        14,
        'Rajesh Nair',
        'KA14L20202',
        '2019-08-22',
        5,
        '9876543221',
        'Active'
    ),
    (
        15,
        'Venkatesh Iyer',
        'KA15L30303',
        '2021-05-15',
        3,
        '9876543222',
        'Active'
    );

-- ==========================
-- EXPANDED SAMPLE DATA FOR CONDUCTOR
-- ==========================

INSERT INTO
    conductor (
        conductor_id,
        name,
        join_date,
        contact_no,
        assigned_route
    )
VALUES (
        1,
        'Suresh M',
        '2020-02-15',
        '9876501234',
        101
    ),
    (
        2,
        'Kiran A',
        '2019-09-10',
        '7890456123',
        102
    ),
    (
        3,
        'Nagesh T',
        '2021-05-20',
        '9345678901',
        103
    ),
    (
        4,
        'Lakshmi Devi',
        '2019-11-12',
        '9876501235',
        104
    ),
    (
        5,
        'Anita Rao',
        '2020-03-08',
        '9876501236',
        105
    ),
    (
        6,
        'Priya Shetty',
        '2018-06-15',
        '9876501237',
        106
    ),
    (
        7,
        'Kavitha Kumar',
        '2019-01-20',
        '9876501238',
        107
    ),
    (
        8,
        'Meena Reddy',
        '2020-07-25',
        '9876501239',
        108
    ),
    (
        9,
        'Sunita Hegde',
        '2021-02-10',
        '9876501240',
        109
    ),
    (
        10,
        'Manjula Gowda',
        '2019-05-18',
        '9876501241',
        110
    ),
    (
        11,
        'Savita Patil',
        '2020-09-22',
        '9876501242',
        101
    ),
    (
        12,
        'Rekha Sharma',
        '2018-12-30',
        '9876501243',
        102
    ),
    (
        13,
        'Usha Murthy',
        '2019-10-14',
        '9876501244',
        103
    ),
    (
        14,
        'Shanthi Bai',
        '2020-04-05',
        '9876501245',
        104
    ),
    (
        15,
        'Pushpa Nair',
        '2021-06-28',
        '9876501246',
        105
    );

-- ==========================
-- EXPANDED SAMPLE DATA FOR ROUTE
-- ==========================

INSERT INTO
    route (
        route_id,
        start_point,
        end_point,
        total_distance,
        average_duration
    )
VALUES (
        101,
        'Majestic',
        'Electronic City',
        22.5,
        '01:10'
    ),
    (
        102,
        'Majestic',
        'Whitefield',
        28.0,
        '01:30'
    ),
    (
        103,
        'BTM Layout',
        'Airport',
        40.2,
        '02:00'
    ),
    (
        104,
        'Jayanagar',
        'Marathahalli',
        18.5,
        '01:00'
    ),
    (
        105,
        'Banashankari',
        'MG Road',
        12.3,
        '00:45'
    ),
    (
        106,
        'Yelahanka',
        'Koramangala',
        25.6,
        '01:20'
    ),
    (
        107,
        'Rajajinagar',
        'HSR Layout',
        20.8,
        '01:15'
    ),
    (
        108,
        'Vijayanagar',
        'Indiranagar',
        15.4,
        '00:55'
    ),
    (
        109,
        'Hebbal',
        'Silk Board',
        22.1,
        '01:25'
    ),
    (
        110,
        'KR Puram',
        'JP Nagar',
        24.7,
        '01:35'
    );

-- ==========================
-- EXPANDED SAMPLE DATA FOR BUS
-- ==========================

INSERT INTO
    bus (
        bus_id,
        depot_name,
        capacity,
        type,
        registration_no
    )
VALUES (
        1,
        'Depot 01',
        45,
        'Volvo',
        'KA01AB1234'
    ),
    (
        2,
        'Depot 02',
        50,
        'Electric',
        'KA02XY5678'
    ),
    (
        3,
        'Depot 03',
        55,
        'Diesel',
        'KA03CD9876'
    ),
    (
        4,
        'Depot 01',
        48,
        'Volvo',
        'KA04EF1111'
    ),
    (
        5,
        'Depot 02',
        52,
        'Electric',
        'KA05GH2222'
    ),
    (
        6,
        'Depot 03',
        50,
        'Diesel',
        'KA06IJ3333'
    ),
    (
        7,
        'Depot 01',
        45,
        'Volvo',
        'KA07KL4444'
    ),
    (
        8,
        'Depot 04',
        48,
        'Electric',
        'KA08MN5555'
    ),
    (
        9,
        'Depot 04',
        55,
        'Diesel',
        'KA09OP6666'
    ),
    (
        10,
        'Depot 02',
        50,
        'Volvo',
        'KA10QR7777'
    ),
    (
        11,
        'Depot 03',
        45,
        'Electric',
        'KA11ST8888'
    ),
    (
        12,
        'Depot 01',
        52,
        'Diesel',
        'KA12UV9999'
    ),
    (
        13,
        'Depot 04',
        48,
        'Volvo',
        'KA13WX1010'
    ),
    (
        14,
        'Depot 02',
        50,
        'Electric',
        'KA14YZ2020'
    ),
    (
        15,
        'Depot 03',
        55,
        'Diesel',
        'KA15AA3030'
    ),
    (
        16,
        'Depot 01',
        45,
        'Volvo',
        'KA16BB4040'
    ),
    (
        17,
        'Depot 04',
        52,
        'Electric',
        'KA17CC5050'
    ),
    (
        18,
        'Depot 02',
        48,
        'Diesel',
        'KA18DD6060'
    ),
    (
        19,
        'Depot 03',
        50,
        'Volvo',
        'KA19EE7070'
    ),
    (
        20,
        'Depot 04',
        55,
        'Electric',
        'KA20FF8080'
    );

-- ==========================
-- EXPANDED SAMPLE DATA FOR SHIFT (6 months of data)
-- ==========================

INSERT INTO
    shift (
        shift_id,
        driver_id,
        conductor_id,
        bus_id,
        route_id,
        shift_date,
        start_time,
        end_time
    )
VALUES
    -- January 2025
    (
        1,
        1,
        1,
        1,
        101,
        '2025-01-02',
        '08:00',
        '12:00'
    ),
    (
        2,
        2,
        2,
        2,
        102,
        '2025-01-02',
        '09:00',
        '13:30'
    ),
    (
        3,
        3,
        3,
        3,
        103,
        '2025-01-02',
        '07:00',
        '11:00'
    ),
    (
        4,
        4,
        4,
        4,
        104,
        '2025-01-02',
        '10:00',
        '14:00'
    ),
    (
        5,
        5,
        5,
        5,
        105,
        '2025-01-02',
        '06:30',
        '10:30'
    ),
    (
        6,
        6,
        6,
        6,
        106,
        '2025-01-03',
        '08:00',
        '12:20'
    ),
    (
        7,
        7,
        7,
        7,
        107,
        '2025-01-03',
        '09:15',
        '13:30'
    ),
    (
        8,
        8,
        8,
        8,
        108,
        '2025-01-03',
        '07:30',
        '11:25'
    ),
    (
        9,
        9,
        9,
        9,
        109,
        '2025-01-03',
        '10:00',
        '14:25'
    ),
    (
        10,
        10,
        10,
        10,
        110,
        '2025-01-03',
        '06:00',
        '10:35'
    ),
    (
        11,
        1,
        11,
        11,
        101,
        '2025-01-04',
        '08:00',
        '12:00'
    ),
    (
        12,
        2,
        12,
        12,
        102,
        '2025-01-04',
        '09:00',
        '13:30'
    ),
    (
        13,
        4,
        13,
        13,
        104,
        '2025-01-05',
        '10:00',
        '14:00'
    ),
    (
        14,
        5,
        14,
        14,
        105,
        '2025-01-05',
        '06:30',
        '10:30'
    ),
    (
        15,
        6,
        15,
        15,
        106,
        '2025-01-06',
        '08:00',
        '12:20'
    ),

-- February 2025
(
    16,
    7,
    1,
    16,
    107,
    '2025-02-01',
    '09:15',
    '13:30'
),
(
    17,
    8,
    2,
    17,
    108,
    '2025-02-01',
    '07:30',
    '11:25'
),
(
    18,
    9,
    3,
    18,
    109,
    '2025-02-01',
    '10:00',
    '14:25'
),
(
    19,
    10,
    4,
    19,
    110,
    '2025-02-01',
    '06:00',
    '10:35'
),
(
    20,
    11,
    5,
    20,
    101,
    '2025-02-02',
    '08:00',
    '12:00'
),
(
    21,
    12,
    6,
    1,
    102,
    '2025-02-02',
    '09:00',
    '13:30'
),
(
    22,
    13,
    7,
    2,
    103,
    '2025-02-03',
    '07:00',
    '11:00'
),
(
    23,
    14,
    8,
    3,
    104,
    '2025-02-03',
    '10:00',
    '14:00'
),
(
    24,
    15,
    9,
    4,
    105,
    '2025-02-04',
    '06:30',
    '10:30'
),
(
    25,
    1,
    10,
    5,
    106,
    '2025-02-04',
    '08:00',
    '12:20'
),
(
    26,
    2,
    11,
    6,
    107,
    '2025-02-05',
    '09:15',
    '13:30'
),
(
    27,
    4,
    12,
    7,
    108,
    '2025-02-05',
    '07:30',
    '11:25'
),
(
    28,
    5,
    13,
    8,
    109,
    '2025-02-06',
    '10:00',
    '14:25'
),
(
    29,
    6,
    14,
    9,
    110,
    '2025-02-06',
    '06:00',
    '10:35'
),
(
    30,
    7,
    15,
    10,
    101,
    '2025-02-07',
    '08:00',
    '12:00'
),

-- March 2025
(
    31,
    8,
    1,
    11,
    102,
    '2025-03-01',
    '09:00',
    '13:30'
),
(
    32,
    9,
    2,
    12,
    103,
    '2025-03-01',
    '07:00',
    '11:00'
),
(
    33,
    10,
    3,
    13,
    104,
    '2025-03-02',
    '10:00',
    '14:00'
),
(
    34,
    11,
    4,
    14,
    105,
    '2025-03-02',
    '06:30',
    '10:30'
),
(
    35,
    12,
    5,
    15,
    106,
    '2025-03-03',
    '08:00',
    '12:20'
),
(
    36,
    13,
    6,
    16,
    107,
    '2025-03-03',
    '09:15',
    '13:30'
),
(
    37,
    14,
    7,
    17,
    108,
    '2025-03-04',
    '07:30',
    '11:25'
),
(
    38,
    15,
    8,
    18,
    109,
    '2025-03-04',
    '10:00',
    '14:25'
),
(
    39,
    1,
    9,
    19,
    110,
    '2025-03-05',
    '06:00',
    '10:35'
),
(
    40,
    2,
    10,
    20,
    101,
    '2025-03-05',
    '08:00',
    '12:00'
),
(
    41,
    4,
    11,
    1,
    102,
    '2025-03-06',
    '09:00',
    '13:30'
),
(
    42,
    5,
    12,
    2,
    103,
    '2025-03-07',
    '07:00',
    '11:00'
),
(
    43,
    6,
    13,
    3,
    104,
    '2025-03-08',
    '10:00',
    '14:00'
),
(
    44,
    7,
    14,
    4,
    105,
    '2025-03-09',
    '06:30',
    '10:30'
),
(
    45,
    8,
    15,
    5,
    106,
    '2025-03-10',
    '08:00',
    '12:20'
),

-- April 2025
(
    46,
    9,
    1,
    6,
    107,
    '2025-04-01',
    '09:15',
    '13:30'
),
(
    47,
    10,
    2,
    7,
    108,
    '2025-04-01',
    '07:30',
    '11:25'
),
(
    48,
    11,
    3,
    8,
    109,
    '2025-04-02',
    '10:00',
    '14:25'
),
(
    49,
    12,
    4,
    9,
    110,
    '2025-04-02',
    '06:00',
    '10:35'
),
(
    50,
    13,
    5,
    10,
    101,
    '2025-04-03',
    '08:00',
    '12:00'
),
(
    51,
    14,
    6,
    11,
    102,
    '2025-04-03',
    '09:00',
    '13:30'
),
(
    52,
    15,
    7,
    12,
    103,
    '2025-04-04',
    '07:00',
    '11:00'
),
(
    53,
    1,
    8,
    13,
    104,
    '2025-04-04',
    '10:00',
    '14:00'
),
(
    54,
    2,
    9,
    14,
    105,
    '2025-04-05',
    '06:30',
    '10:30'
),
(
    55,
    4,
    10,
    15,
    106,
    '2025-04-06',
    '08:00',
    '12:20'
),
(
    56,
    5,
    11,
    16,
    107,
    '2025-04-07',
    '09:15',
    '13:30'
),
(
    57,
    6,
    12,
    17,
    108,
    '2025-04-08',
    '07:30',
    '11:25'
),
(
    58,
    7,
    13,
    18,
    109,
    '2025-04-09',
    '10:00',
    '14:25'
),
(
    59,
    8,
    14,
    19,
    110,
    '2025-04-10',
    '06:00',
    '10:35'
),
(
    60,
    9,
    15,
    20,
    101,
    '2025-04-11',
    '08:00',
    '12:00'
),

-- May 2025
(
    61,
    10,
    1,
    1,
    102,
    '2025-05-01',
    '09:00',
    '13:30'
),
(
    62,
    11,
    2,
    2,
    103,
    '2025-05-01',
    '07:00',
    '11:00'
),
(
    63,
    12,
    3,
    3,
    104,
    '2025-05-02',
    '10:00',
    '14:00'
),
(
    64,
    13,
    4,
    4,
    105,
    '2025-05-02',
    '06:30',
    '10:30'
),
(
    65,
    14,
    5,
    5,
    106,
    '2025-05-03',
    '08:00',
    '12:20'
),
(
    66,
    15,
    6,
    6,
    107,
    '2025-05-03',
    '09:15',
    '13:30'
),
(
    67,
    1,
    7,
    7,
    108,
    '2025-05-04',
    '07:30',
    '11:25'
),
(
    68,
    2,
    8,
    8,
    109,
    '2025-05-04',
    '10:00',
    '14:25'
),
(
    69,
    4,
    9,
    9,
    110,
    '2025-05-05',
    '06:00',
    '10:35'
),
(
    70,
    5,
    10,
    10,
    101,
    '2025-05-06',
    '08:00',
    '12:00'
),
(
    71,
    6,
    11,
    11,
    102,
    '2025-05-07',
    '09:00',
    '13:30'
),
(
    72,
    7,
    12,
    12,
    103,
    '2025-05-08',
    '07:00',
    '11:00'
),
(
    73,
    8,
    13,
    13,
    104,
    '2025-05-09',
    '10:00',
    '14:00'
),
(
    74,
    9,
    14,
    14,
    105,
    '2025-05-10',
    '06:30',
    '10:30'
),
(
    75,
    10,
    15,
    15,
    106,
    '2025-05-11',
    '08:00',
    '12:20'
),

-- June 2025
(
    76,
    11,
    1,
    16,
    107,
    '2025-06-01',
    '09:15',
    '13:30'
),
(
    77,
    12,
    2,
    17,
    108,
    '2025-06-01',
    '07:30',
    '11:25'
),
(
    78,
    13,
    3,
    18,
    109,
    '2025-06-02',
    '10:00',
    '14:25'
),
(
    79,
    14,
    4,
    19,
    110,
    '2025-06-02',
    '06:00',
    '10:35'
),
(
    80,
    15,
    5,
    20,
    101,
    '2025-06-03',
    '08:00',
    '12:00'
),
(
    81,
    1,
    6,
    1,
    102,
    '2025-06-03',
    '09:00',
    '13:30'
),
(
    82,
    2,
    7,
    2,
    103,
    '2025-06-04',
    '07:00',
    '11:00'
),
(
    83,
    4,
    8,
    3,
    104,
    '2025-06-04',
    '10:00',
    '14:00'
),
(
    84,
    5,
    9,
    4,
    105,
    '2025-06-05',
    '06:30',
    '10:30'
),
(
    85,
    6,
    10,
    5,
    106,
    '2025-06-06',
    '08:00',
    '12:20'
),
(
    86,
    7,
    11,
    6,
    107,
    '2025-06-07',
    '09:15',
    '13:30'
),
(
    87,
    8,
    12,
    7,
    108,
    '2025-06-08',
    '07:30',
    '11:25'
),
(
    88,
    9,
    13,
    8,
    109,
    '2025-06-09',
    '10:00',
    '14:25'
),
(
    89,
    10,
    14,
    9,
    110,
    '2025-06-10',
    '06:00',
    '10:35'
),
(
    90,
    11,
    15,
    10,
    101,
    '2025-06-11',
    '08:00',
    '12:00'
);

-- ==========================
-- EXPANDED SAMPLE DATA FOR COMPLAINT (Various statuses across 6 months)
-- ==========================

INSERT INTO
    complaint (
        complaint_id,
        complaint_date,
        status,
        bus_id,
        driver_id,
        complaint_details
    )
VALUES
    -- January 2025
    (
        1,
        '2025-01-05',
        'Resolved',
        1,
        1,
        'Driver was overspeeding near Silk Board.'
    ),
    (
        2,
        '2025-01-08',
        'Resolved',
        2,
        2,
        'Conductor misbehaved with a passenger.'
    ),
    (
        3,
        '2025-01-12',
        'In Progress',
        3,
        3,
        'Bus did not stop at designated stop.'
    ),
    (
        4,
        '2025-01-15',
        'Pending',
        1,
        1,
        'AC not working properly.'
    ),
    (
        5,
        '2025-01-18',
        'Resolved',
        4,
        4,
        'Rash driving on highway.'
    ),
    (
        6,
        '2025-01-20',
        'In Progress',
        5,
        5,
        'Late arrival at bus stop.'
    ),
    (
        7,
        '2025-01-22',
        'Pending',
        6,
        6,
        'Conductor did not issue ticket.'
    ),
    (
        8,
        '2025-01-25',
        'Resolved',
        1,
        1,
        'Bus cleanliness issue.'
    ),
    (
        9,
        '2025-01-27',
        'Pending',
        7,
        7,
        'Driver used mobile while driving.'
    ),
    (
        10,
        '2025-01-29',
        'In Progress',
        8,
        8,
        'Overcrowding in bus.'
    ),

-- February 2025
(
    11,
    '2025-02-02',
    'Resolved',
    2,
    2,
    'Route deviation without notice.'
),
(
    12,
    '2025-02-05',
    'In Progress',
    9,
    9,
    'Rough braking causing discomfort.'
),
(
    13,
    '2025-02-08',
    'Pending',
    10,
    10,
    'Bus broke down mid-route.'
),
(
    14,
    '2025-02-10',
    'Resolved',
    1,
    1,
    'Driver refused to stop at request stop.'
),
(
    15,
    '2025-02-12',
    'Resolved',
    11,
    11,
    'Conductor arguing with passengers.'
),
(
    16,
    '2025-02-15',
    'In Progress',
    2,
    2,
    'Speeding in residential area.'
),
(
    17,
    '2025-02-18',
    'Pending',
    12,
    12,
    'Seat belts not functional.'
),
(
    18,
    '2025-02-20',
    'Resolved',
    3,
    3,
    'Bus started before passengers seated.'
),
(
    19,
    '2025-02-23',
    'In Progress',
    13,
    13,
    'Driver smoking inside bus.'
),
(
    20,
    '2025-02-26',
    'Pending',
    1,
    1,
    'No announcements for stops.'
),

-- March 2025
(
    21,
    '2025-03-01',
    'Resolved',
    14,
    14,
    'Overcharging by conductor.'
),
(
    22,
    '2025-03-04',
    'In Progress',
    15,
    15,
    'Unsafe overtaking.'
),
(
    23,
    '2025-03-07',
    'Pending',
    16,
    1,
    'Driver rude to elderly passenger.'
),
(
    24,
    '2025-03-10',
    'Resolved',
    2,
    2,
    'Bus interior lights not working.'
),
(
    25,
    '2025-03-12',
    'Resolved',
    1,
    1,
    'Driver did not wait for running passenger.'
),
(
    26,
    '2025-03-15',
    'In Progress',
    17,
    4,
    'Excessive honking.'
),
(
    27,
    '2025-03-18',
    'Pending',
    18,
    5,
    'Conductor lost passenger ticket.'
),
(
    28,
    '2025-03-20',
    'Resolved',
    3,
    6,
    'Bus skipped scheduled stop.'
),
(
    29,
    '2025-03-23',
    'In Progress',
    19,
    7,
    'Mechanical noise from engine.'
),
(
    30,
    '2025-03-26',
    'Pending',
    1,
    8,
    'Emergency exit blocked.'
),
(
    31,
    '2025-03-28',
    'Resolved',
    20,
    9,
    'Driver not in proper uniform.'
),

-- April 2025
(
    32,
    '2025-04-02',
    'In Progress',
    4,
    10,
    'Bus left early from start point.'
),
(
    33,
    '2025-04-05',
    'Pending',
    5,
    11,
    'Dirty windows obstructing view.'
),
(
    34,
    '2025-04-08',
    'Resolved',
    2,
    12,
    'Conductor did not help disabled passenger.'
),
(
    35,
    '2025-04-10',
    'Resolved',
    6,
    13,
    'Harsh acceleration causing injuries.'
),
(
    36,
    '2025-04-13',
    'In Progress',
    1,
    14,
    'Driver talking on phone continuously.'
),
(
    37,
    '2025-04-16',
    'Pending',
    7,
    15,
    'Bus door malfunction.'
),
(
    38,
    '2025-04-18',
    'Resolved',
    8,
    1,
    'Overcrowding beyond capacity.'
),
(
    39,
    '2025-04-21',
    'In Progress',
    9,
    2,
    'Wrong route information displayed.'
),
(
    40,
    '2025-04-24',
    'Pending',
    2,
    4,
    'Driver attitude problem.'
),
(
    41,
    '2025-04-27',
    'Resolved',
    10,
    5,
    'No proper ventilation in bus.'
),

-- May 2025
(
    42,
    '2025-05-01',
    'In Progress',
    1,
    6,
    'Seat cushions torn and uncomfortable.'
),
(
    43,
    '2025-05-04',
    'Pending',
    11,
    7,
    'Driver jumping red lights.'
),
(
    44,
    '2025-05-07',
    'Resolved',
    12,
    8,
    'Conductor gave wrong change.'
),
(
    45,
    '2025-05-10',
    'Resolved',
    2,
    9,
    'Bus music too loud.'
),
(
    46,
    '2025-05-12',
    'In Progress',
    13,
    10,
    'Driver not following lane discipline.'
),
(
    47,
    '2025-05-15',
    'Pending',
    1,
    11,
    'Unclean washroom in Volvo.'
),
(
    48,
    '2025-05-18',
    'Resolved',
    14,
    12,
    'Bus did not wait at scheduled time.'
),
(
    49,
    '2025-05-21',
    'In Progress',
    15,
    13,
    'Reckless lane changing.'
),
(
    50,
    '2025-05-24',
    'Pending',
    16,
    14,
    'Conductor behavior inappropriate.'
),
(
    51,
    '2025-05-27',
    'Resolved',
    2,
    15,
    'GPS display not working.'
),
(
    52,
    '2025-05-30',
    'In Progress',
    1,
    1,
    'Driver refused senior citizen seat.'
),

-- June 2025
(
    53,
    '2025-06-02',
    'Pending',
    17,
    2,
    'Bus arrived 30 minutes late.'
),
(
    54,
    '2025-06-05',
    'Resolved',
    18,
    4,
    'Sudden braking caused fall.'
),
(
    55,
    '2025-06-08',
    'In Progress',
    2,
    5,
    'Exhaust smoke entering bus.'
),
(
    56,
    '2025-06-10',
    'Pending',
    19,
    6,
    'Driver overtaking dangerously.'
),
(
    57,
    '2025-06-13',
    'Resolved',
    1,
    7,
    'Ticket machine not working.'
),
(
    58,
    '2025-06-16',
    'In Progress',
    20,
    8,
    'Poor maintenance of bus interior.'
),
(
    59,
    '2025-06-19',
    'Pending',
    3,
    9,
    'Driver eating while driving.'
),
(
    60,
    '2025-06-22',
    'Resolved',
    4,
    10,
    'Bus number display incorrect.'
),
(
    61,
    '2025-06-25',
    'In Progress',
    2,
    11,
    'No social distancing maintained.'
),
(
    62,
    '2025-06-28',
    'Pending',
    1,
    12,
    'Driver argument with another driver.'
);

-- ==========================
-- SAMPLE DATA FOR ACCIDENT REPORT
-- ==========================

INSERT INTO
    accident_report (
        accident_id,
        bus_id,
        driver_id,
        route_id,
        location,
        cost,
        accident_date,
        accident_details
    )
VALUES (
        1,
        1,
        1,
        101,
        'Bommanahalli',
        15000,
        '2024-12-20',
        'Minor collision with auto rickshaw'
    ),
    (
        2,
        2,
        2,
        102,
        'KR Puram',
        45000,
        '2025-01-03',
        'Brake failure and roadside hit'
    ),
    (
        3,
        3,
        3,
        103,
        'Airport Road',
        30000,
        '2025-01-10',
        'Skid due to rain'
    ),
    (
        4,
        5,
        5,
        104,
        'Jayanagar Main Road',
        25000,
        '2025-01-15',
        'Hit by another vehicle at traffic signal'
    ),
    (
        5,
        7,
        7,
        106,
        'Yeshwantpur Junction',
        35000,
        '2025-01-20',
        'Collision with two-wheeler'
    );

-- ==========================
-- ADDITIONAL DRIVER DATA (More Inactive and On Leave)
-- ==========================

INSERT INTO
    driver (
        driver_id,
        name,
        license_no,
        join_date,
        experience_years,
        contact_no,
        current_status
    )
VALUES (
        16,
        'Anand Kumar',
        'KA16L40404',
        '2021-08-10',
        2,
        '9876543300',
        'Inactive'
    ),
    (
        17,
        'Sanjiv Pillai',
        'KA17L50505',
        '2020-12-15',
        3,
        '9876543301',
        'Inactive'
    ),
    (
        18,
        'Harsha Reddy',
        'KA18L60606',
        '2019-03-22',
        5,
        '9876543302',
        'On Leave'
    ),
    (
        19,
        'Girish Nayak',
        'KA19L70707',
        '2018-09-30',
        6,
        '9876543303',
        'On Leave'
    ),
    (
        20,
        'Vikram Singh',
        'KA20L80808',
        '2017-06-12',
        7,
        '9876543304',
        'Active'
    ),
    (
        21,
        'Rajkumar Yadav',
        'KA21L90909',
        '2019-11-08',
        4,
        '9876543305',
        'Inactive'
    ),
    (
        22,
        'Mohan Shetty',
        'KA22L11121',
        '2020-05-19',
        4,
        '9876543306',
        'On Leave'
    ),
    (
        23,
        'Thirumal Reddy',
        'KA23L22132',
        '2018-02-14',
        7,
        '9876543307',
        'Active'
    ),
    (
        24,
        'Ashok Nair',
        'KA24L33143',
        '2021-03-25',
        2,
        '9876543308',
        'Inactive'
    ),
    (
        25,
        'Balaji Gowda',
        'KA25L44154',
        '2019-07-18',
        5,
        '9876543309',
        'Active'
    );

-- ==========================
-- ADDITIONAL CONDUCTOR DATA
-- ==========================

INSERT INTO
    conductor (
        conductor_id,
        name,
        join_date,
        contact_no,
        assigned_route
    )
VALUES (
        16,
        'Harshita Desai',
        '2020-11-20',
        '9876501247',
        106
    ),
    (
        17,
        'Navya Sharma',
        '2021-04-12',
        '9876501248',
        107
    ),
    (
        18,
        'Divya Rao',
        '2019-08-30',
        '9876501249',
        108
    ),
    (
        19,
        'Fatima Khan',
        '2020-01-15',
        '9876501250',
        109
    ),
    (
        20,
        'Asha Verma',
        '2018-10-05',
        '9876501251',
        110
    ),
    (
        21,
        'Chitra Patel',
        '2019-12-20',
        '9876501252',
        101
    ),
    (
        22,
        'Deepa Iyer',
        '2021-06-10',
        '9876501253',
        102
    ),
    (
        23,
        'Esha Gupta',
        '2020-03-08',
        '9876501254',
        103
    ),
    (
        24,
        'Fiona Pinto',
        '2019-09-14',
        '9876501255',
        104
    ),
    (
        25,
        'Geeta Kumari',
        '2018-05-25',
        '9876501256',
        105
    );

-- ==========================
-- ADDITIONAL ROUTES DATA
-- ==========================

INSERT INTO
    route (
        route_id,
        start_point,
        end_point,
        total_distance,
        average_duration
    )
VALUES (
        111,
        'Orion Mall',
        'Peenya Industrial Area',
        18.9,
        '01:05'
    ),
    (
        112,
        'Tumkur Road',
        'Bellandur Tech Park',
        35.5,
        '02:15'
    ),
    (
        113,
        'Bannerghatta Road',
        'Hosur Road',
        22.3,
        '01:30'
    ),
    (
        114,
        'Outer Ring Road',
        'Hebbal Lake',
        28.7,
        '01:45'
    ),
    (
        115,
        'Indiranagar',
        'Sarjapur Road',
        20.5,
        '01:25'
    );

-- ==========================
-- ADDITIONAL BUS DATA
-- ==========================

INSERT INTO
    bus (
        bus_id,
        depot_name,
        capacity,
        type,
        registration_no
    )
VALUES (
        21,
        'Depot 01',
        48,
        'Volvo',
        'KA21GG9090'
    ),
    (
        22,
        'Depot 02',
        50,
        'Electric',
        'KA22HH1010'
    ),
    (
        23,
        'Depot 03',
        55,
        'Diesel',
        'KA23II2020'
    ),
    (
        24,
        'Depot 04',
        45,
        'Volvo',
        'KA24JJ3030'
    ),
    (
        25,
        'Depot 01',
        52,
        'Electric',
        'KA25KK4040'
    ),
    (
        26,
        'Depot 02',
        50,
        'Diesel',
        'KA26LL5050'
    ),
    (
        27,
        'Depot 03',
        48,
        'Volvo',
        'KA27MM6060'
    ),
    (
        28,
        'Depot 04',
        55,
        'Electric',
        'KA28NN7070'
    );

-- ==========================
-- ADDITIONAL SHIFT DATA (July 2025)
-- ==========================

INSERT INTO
    shift (
        shift_id,
        driver_id,
        conductor_id,
        bus_id,
        route_id,
        shift_date,
        start_time,
        end_time
    )
VALUES
    -- July 2025
    (
        91,
        12,
        1,
        11,
        101,
        '2025-07-01',
        '08:00',
        '12:00'
    ),
    (
        92,
        13,
        2,
        12,
        102,
        '2025-07-01',
        '09:00',
        '13:30'
    ),
    (
        93,
        14,
        3,
        13,
        103,
        '2025-07-02',
        '07:00',
        '11:00'
    ),
    (
        94,
        15,
        4,
        14,
        104,
        '2025-07-02',
        '10:00',
        '14:00'
    ),
    (
        95,
        1,
        5,
        15,
        105,
        '2025-07-03',
        '06:30',
        '10:30'
    ),
    (
        96,
        2,
        6,
        16,
        106,
        '2025-07-03',
        '08:00',
        '12:20'
    ),
    (
        97,
        20,
        7,
        17,
        107,
        '2025-07-04',
        '09:15',
        '13:30'
    ),
    (
        98,
        23,
        8,
        18,
        108,
        '2025-07-04',
        '07:30',
        '11:25'
    ),
    (
        99,
        25,
        9,
        19,
        109,
        '2025-07-05',
        '10:00',
        '14:25'
    ),
    (
        100,
        4,
        10,
        20,
        110,
        '2025-07-05',
        '06:00',
        '10:35'
    );

-- ==========================
-- ADDITIONAL COMPLAINT DATA (July - September 2025)
-- ==========================

INSERT INTO
    complaint (
        complaint_id,
        complaint_date,
        status,
        bus_id,
        driver_id,
        complaint_details
    )
VALUES
    (
        63,
        '2025-07-01',
        'Pending',
        3,
        3,
        'Bus air conditioning not functioning'
    ),
    (
        64,
        '2025-07-03',
        'In Progress',
        5,
        5,
        'Driver ignored request stop'
    ),
    (
        65,
        '2025-07-05',
        'Resolved',
        8,
        8,
        'Broken seats in rear section'
    ),
    (
        66,
        '2025-07-08',
        'Pending',
        11,
        11,
        'No proper route information displayed'
    ),
    (
        67,
        '2025-07-10',
        'In Progress',
        2,
        2,
        'Reckless driving near school zone'
    ),
    (
        68,
        '2025-07-15',
        'Resolved',
        15,
        14,
        'Conductor behavior complaint'
    ),
    (
        69,
        '2025-08-02',
        'Pending',
        4,
        4,
        'Unsafe emergency exit blocked'
    ),
    (
        70,
        '2025-08-05',
        'In Progress',
        9,
        9,
        'Seat belts not available'
    ),
    (
        71,
        '2025-08-10',
        'Resolved',
        6,
        6,
        'Pollution control certificate expired'
    ),
    (
        72,
        '2025-08-15',
        'Pending',
        12,
        12,
        'Driver speeding on residential road'
    ),
    (
        73,
        '2025-09-01',
        'In Progress',
        1,
        1,
        'Bus arrived extremely late'
    ),
    (
        74,
        '2025-09-05',
        'Resolved',
        7,
        7,
        'Conductor misbehavior with elderly passenger'
    ),
    (
        75,
        '2025-09-10',
        'Pending',
        13,
        13,
        'No ticket issued by conductor'
    ),
    (
        76,
        '2025-09-12',
        'In Progress',
        10,
        10,
        'Overcrowding beyond capacity'
    ),
    (
        77,
        '2025-09-18',
        'Resolved',
        18,
        14,
        'Broken GPS navigation system'
    );

-- ==========================
-- ADDITIONAL ACCIDENT DATA (July - September 2025)
-- ==========================

INSERT INTO
    accident_report (
        accident_id,
        bus_id,
        driver_id,
        route_id,
        location,
        cost,
        accident_date,
        accident_details
    )
VALUES (
        6,
        4,
        4,
        104,
        'Marathahalli',
        28000,
        '2025-07-08',
        'Side collision with auto at traffic junction'
    ),
    (
        7,
        10,
        10,
        110,
        'JP Nagar',
        18000,
        '2025-07-15',
        'Minor rear-end collision'
    ),
    (
        8,
        6,
        6,
        106,
        'Yelahanka Road',
        50000,
        '2025-08-03',
        'Major collision with truck'
    ),
    (
        9,
        15,
        14,
        105,
        'Banashankari Junction',
        22000,
        '2025-08-20',
        'Hit by rash driver'
    ),
    (
        10,
        9,
        9,
        109,
        'Hebbal Lake',
        32000,
        '2025-09-05',
        'Road accident due to wet road conditions'
    );