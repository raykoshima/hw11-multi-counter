// นำเข้า React และ ReactDOM จากไลบรารี react และ react-dom
const root = ReactDOM.createRoot(document.getElementById("root"));

// ทำการ render คอมโพเนนต์ App ลงใน DOM ที่มี id เป็น 'root'
root.render(<App />);

// คอมโพเนนต์ Counter ที่รับ props เป็น item และ hdlUpdate, hdlRemoveCounter จาก App
function Counter(props) {
  // แสดงค่า props.item ใน console
  console.log(props.item);

  // ฟังก์ชันที่ใช้ในการอัพเดทค่า counter และตรวจสอบว่าค่าใหม่ไม่ติดลบ
  const updateCounter = (n) => {
    if (props.item.number + n < 0) {
      return;
    }
    props.hdlUpdate(props.item.id, n);
  };

  // ฟังก์ชันที่ใช้ในการลบ counter โดยเรียกใช้ hdlRemoveCounter ที่ถูกส่งมาจาก App
  const removeCounter = () => {
    props.hdlRemoveCounter(props.item.id);
  };

  // ส่วนแสดงผล JSX ของ Counter
  return (
    <div className="counter">
      <button onClick={() => updateCounter(1)}> + </button>
      <h2> {props.item.number} </h2>
      <button onClick={() => updateCounter(-1)}> - </button>
      <button onClick={() => updateCounter(-props.item.number)}> C </button>
      <button onClick={removeCounter}> X </button>
    </div>
  );
}

// คอมโพเนนต์ SumInfo ที่รับ props เป็น counters, color, และ size จาก App
function SumInfo(props) {
  // คำนวณผลรวมของ counters โดยใช้ reduce
  const sum = props.counters.reduce((acc, counter) => acc + counter.number, 0);

  // กำหนด style ในตัวแปร stTitle โดยใช้ props.color และ props.size
  const stTitle = {
    color: props.color,
    fontSize: props.size === "Thanasap" ? "50px" : "40px",
  };

  // ส่วนแสดงผล JSX ของ SumInfo
  return (
    <div className="suminfo">
      <h1 style={stTitle}>sum = {sum}</h1>
    </div>
  );
}

// คอมโพเนนต์หลัก App ที่ใช้ Hook ในการจัดการ state และฟังก์ชันต่าง ๆ
function App() {
  // สร้าง state counters ด้วย Hook useState และกำหนดค่าเริ่มต้นเป็น array ที่มี counter แรก
  const [counters, setCounters] = React.useState([{ id: 1, number: 0 }]);

  // ฟังก์ชันที่ใช้ในการอัพเดทค่าของ counter ด้วย id และตัวเลขที่ต้องการเพิ่มหรือลด
  const hdlUpdate = (id, num) => {
    // คล๊อน array counters เพื่อไม่ทำให้เกิด side effect
    const cloneCounters = [...counters];
    // หา index ของ counter ที่ต้องการอัพเดท
    let idx = cloneCounters.findIndex((el) => el.id === id);
    // อัพเดทค่า number ของ counter ที่พบ
    cloneCounters[idx].number += num;
    // อัพเดท state counters ด้วยค่าใหม่
    setCounters(cloneCounters);
  };

  // ฟังก์ชันที่ใช้ในการเพิ่ม counter ใหม่
  const hdlAddCounter = () => {
    // หา id ใหม่โดยใช้ค่า id ของ counter ล่าสุด + 1
    let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1;
    // คล๊อน array counters เพื่อไม่ทำให้เกิด side effect
    const cloneCounters = [...counters];
    // เพิ่ม counter ใหม่เข้าไปใน array counters
    cloneCounters.push({ id: newId, number: 0 });
    // อัพเดท state counters ด้วยค่าใหม่
    setCounters(cloneCounters);
  };

  // ฟังก์ชันที่ใช้ในการลบ counter ด้วย id
  const hdlRemoveCounter = (id) => {
    // สร้าง array ใหม่โดยลบ counter ที่มี id ตรงกับที่ถูกส่งมา
    const updatedCounters = counters.filter((counter) => counter.id !== id);
    // อัพเดท state counters ด้วย array ใหม่ที่ไม่มี counter ที่ถูกลบ
    setCounters(updatedCounters);
  };

  // ส่วนแสดงผล JSX ของ App
  return (
    <>
      <div className="suminfo">
        {/* แสดงชื่อและปุ่ม "Add Counter" ที่เรียกใช้ hdlAddCounter เมื่อคลิก */}
        <h1 className="text-center">Codecamp Academy 1</h1> <br />
        <br />
        <button className="button-center button-23" onClick={hdlAddCounter}>
          Add Counter
        </button>
      </div>
      {/* แสดง SumInfo โดยส่ง props ไปยัง SumInfo */}
      <SumInfo color="purple" size="Thanasap" counters={counters} />

      {/* แสดง Counter สำหรับทุกรายการใน counters array */}
      {counters.map((el) => {
        return (
          <Counter
            key={el.id}
            item={el}
            hdlUpdate={hdlUpdate}
            hdlRemoveCounter={hdlRemoveCounter}
          />
        );
      })}
    </>
  );
}
