-- ==========================
-- SAMPLE DATA FOR DRIVER
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
    );

-- ==========================
-- SAMPLE DATA FOR CONDUCTOR
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
    );

-- ==========================
-- SAMPLE DATA FOR ROUTE
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
    );

-- ==========================
-- SAMPLE DATA FOR BUS
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
    );

-- ==========================
-- SAMPLE DATA FOR SHIFT
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
VALUES (
        1,
        1,
        1,
        1,
        101,
        '2025-01-10',
        '08:00',
        '12:00'
    ),
    (
        2,
        2,
        2,
        2,
        102,
        '2025-01-10',
        '09:00',
        '13:30'
    ),
    (
        3,
        3,
        3,
        3,
        103,
        '2025-01-11',
        '07:00',
        '11:00'
    );

-- ==========================
-- SAMPLE DATA FOR COMPLAINT
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
VALUES (
        1,
        '2025-01-05',
        'Pending',
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
        'Under Review',
        3,
        3,
        'Bus did not stop at designated stop.'
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
    );