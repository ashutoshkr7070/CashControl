import React, { useEffect, useState, useMemo, useCallback } from "react";
import '../styles/HomePage.css';
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [frequency, setFrequency] = useState("30");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("All");
  const [category, setCategory] = useState("All");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  const columns = useMemo(() => [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="d-flex">
          <EditOutlined
            onClick={() => {
              form.setFieldsValue({
                ...record,
                date: moment(record.date),
              });
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
    // eslint-disable-next-line
  ], [form]);

  const getAllTransactions = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post("/api/v1/transections/get-transection", {
        userid: user._id,
        frequency,
        selectedDate,
        type,
        category,
      });
      setLoading(false);
      setAllTransactions(res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("Fetch issue with transaction");
    }
  }, [frequency, selectedDate, type, category]);

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  // Handle the modal close
  const handleCloseModal = () => {
    form.resetFields();
    setShowModal(false);
    setEditable(null);
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transections/delete-transection", {
        transacationId: record._id,
      });
      setLoading(false);
      getAllTransactions();
      message.success("Transaction Deleted!");
    } catch (error) {
      setLoading(false);
      message.error("Unable to delete");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      if (editable) {
        await axios.post("/api/v1/transections/edit-transection", {
          payload: {
            ...values,
            userId: user._id,
          },
          transectionId: editable._id,
        });
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/api/v1/transections/add-transection", {
          ...values,
          userid: user._id,
        });
        message.success("Transaction Added Successfully");
      }

      setLoading(false);
      handleCloseModal();
      getAllTransactions();
    } catch (error) {
      setLoading(false);
      message.error("Failed to add or update transaction");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="d-flex flex-column">
        <div className="filters">
          <div>
            <h6>Select View</h6>
            <div className="switch-icons">
              <UnorderedListOutlined
                className={`mx-2 ${viewData === "table" ? "active-icon" : "inactive-icon"}`}
                onClick={() => setViewData("table")}
              />
              <AreaChartOutlined
                className={`mx-2 ${viewData === "analytics" ? "active-icon" : "inactive-icon"}`}
                onClick={() => setViewData("analytics")}
              />
            </div>
          </div>

          <div>
            <button
              className="btn custom-button"
              onClick={() => {
                form.resetFields();
                setEditable(null);
                setShowModal(true);
              }}
            >
              Add New
            </button>
          </div>
        </div>

        <div className="filters-second">
          <div>
            <h6>Select Frequency</h6>
            <Select
              value={frequency}
              onChange={setFrequency}
            >
              <Select.Option value="7">LAST 1 Week</Select.Option>
              <Select.Option value="30">LAST 1 Month</Select.Option>
              <Select.Option value="365">LAST 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={setSelectedDate}
              />
            )}
          </div>

          <div className="filter-tab ">
            <h6>Select Type</h6>
            <Select value={type} onChange={setType}>
              <Select.Option value="All">All</Select.Option>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </div>

          <div>
            <h6>Select Category</h6>
            <Select value={category} onChange={setCategory}>
              <Select.Option value="All">All</Select.Option>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="Allowance">Allowance</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Movie">Movie</Select.Option>
              <Select.Option value="Transportation">Transportation</Select.Option>
              <Select.Option value="Self-development">Self-development</Select.Option>
              <Select.Option value="Social-Life">Social-Life</Select.Option>
              <Select.Option value="Others">Others</Select.Option>
            </Select>
          </div>
        </div>
      </div>

      <div className="content table-responsive">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransactions} />
        ) : (
          <React.Suspense fallback={<Spinner />}>
            <Analytics allTransections={allTransactions} />
          </React.Suspense>
        )}
      </div>

      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable ? { ...editable, date: moment(editable.date) } : {}}
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter the amount" }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Select>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="Allowance">Allowance</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Movie">Movie</Select.Option>
              <Select.Option value="Transportation">Transportation</Select.Option>
              <Select.Option value="Self-development">Self-development</Select.Option>
              <Select.Option value="Social-Life">Social-Life</Select.Option>
              <Select.Option value="Others">Others</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input type="text" />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary custom-button">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default React.memo(HomePage);
