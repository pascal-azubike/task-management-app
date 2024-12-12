import { Form, Input, Select, DatePicker, Radio, Button, notification } from 'antd';
import { Priority, TaskFormData } from '../types/task';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useState } from 'react';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => Promise<void>;
  initialValues?: TaskFormData;
  isEditing?: boolean;
}

const TaskForm = ({ onSubmit, initialValues, isEditing = false }: TaskFormProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const formattedData: TaskFormData = {
        title: values.title,
        priority: values.priority,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        completed: values.completed || false,
      };
      
      await onSubmit(formattedData);
      if (!isEditing) {
        form.resetFields();
      }
      
      notification.success({
        message: `Task ${isEditing ? 'updated' : 'added'} successfully!`,
        description: formattedData.title,
        className: 'neon-text',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialValues ? {
        ...initialValues,
        dueDate: dayjs(initialValues.dueDate),
      } : {
        completed: false
      }}
      className="p-6 rounded-lg bg-opacity-10 bg-white backdrop-blur-lg border border-gray-700"
    >
      <Form.Item
        name="title"
        label="Task Title"
        rules={[{ required: true, message: 'Please enter a task title' }]}
      >
        <Input placeholder="Enter task title" />
      </Form.Item>

      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: 'Please select a priority' }]}
      >
        <Select placeholder="Select priority">
          <Select.Option value="High">High</Select.Option>
          <Select.Option value="Medium">Medium</Select.Option>
          <Select.Option value="Low">Low</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: 'Please select a due date' }]}
      >
        <DatePicker className="w-full" inputReadOnly />
      </Form.Item>

      <Form.Item name="completed" label="Status">
        <Radio.Group className="status-radio-group">
          <Radio value={false}>Not Completed</Radio>
          <Radio value={true}>Completed</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isEditing ? 'Update Task' : 'Add Task'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm; 