import { Button, Card, Checkbox, Divider, Input, InputRef, List, Modal, Typography } from "antd";
import { useRef, useState } from "react";

function Dashboard() {
  const [open, setopen] = useState(false)
  const [data, setdata] = useState<string[]>([])
  const [checked, setchecked] = useState<boolean>(false)
  const ref1 = useRef<InputRef>(null)

  const ismodalopen = () => {
    setopen(true)
  }

  const onokhandler = () => {
    setopen(false)
  }

  const oncancelhandler = () => {
    setopen(false)
  }
  
  const id = Date.now()

  const addTodo = () => {
    const inputvalue = ref1.current!.input!.value
    setopen(false)
    setdata([...data, inputvalue])
  }

  const delteTodo = () => {
    setopen(false)
  }
  return (
    <div>
      <Typography.Title className="flex justify-center" level={2}>Todo Application</Typography.Title>
      <Divider />
      <div className="border-r flex justify-center mt-20  mb-10 w-300 h-full">
        <Button type="primary" onClick={ismodalopen} className="rounded-full  ">+</Button>
        <Modal
          open={open}
          onOk={onokhandler}
          onCancel={oncancelhandler}
          title="Enter a Todo..."
          className="w-[600px] h-[600px]"
          footer={[
            <div key={id}>
              <Button key={id} type="primary" onClick={addTodo}>Add</Button>
              <Button key={id} type="primary" danger onClick={delteTodo}>Cancel</Button>
            </div>
          ]}>

          <Input
            ref={ref1}
            type="text"
            className="mt-7 mb-3"
            placeholder="Enter a Todo..."
          />
        </Modal>
      </div>
      <div className="flex justify-center mb-[100px]">
        <Card className="flex  w-[600px] h-[400px]  bg-gray-300 ml-400 rounded-md">
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                className="w-full h-full"
              >
                <div className="bg-slate-50 p-2">
                  <Checkbox className=" text-xl p-2" onChange={(() => setchecked(true))}>{checked ? <del>{item}</del> : item}</Checkbox>
                  <Button type="primary" danger>Delete</Button>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );

}

export default Dashboard;