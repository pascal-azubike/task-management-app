import Form from 'antd/es/form';
import 'antd/es/form/style';

import Input from 'antd/es/input';
import 'antd/es/input/style';

import Select from 'antd/es/select';
import 'antd/es/select/style';

import DatePicker from 'antd/es/date-picker';
import 'antd/es/date-picker/style';

import Radio from 'antd/es/radio';
import 'antd/es/radio/style';

import Button from 'antd/es/button';
import 'antd/es/button/style';

import notification from 'antd/es/notification';
import 'antd/es/notification/style';

import {  TaskFormData } from '../types/task';

import dayjs from 'dayjs';
import { useState } from 'react';

/**
 * Form component for creating and editing tasks.
 * Handles form validation, submission, and data updates through the mock API.
 * Used in both create and edit modes with dynamic form behavior.
 */
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
      className="w-full"
    >
      <div className="space-y-4">
        <Form.Item
          name="title"
          label="Task Title"
          rules={[{ required: true, message: 'Please enter a task title' }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <div className="grid sm:grid-cols-2 gap-4">
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
        </div>

        <Form.Item name="completed" label="Status">
          <Radio.Group className="status-radio-group">
            <Radio value={false}>Not Completed</Radio>
            <Radio value={true}>Completed</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item className="mb-0">
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
      </div>
    </Form>
  );
};

export default TaskForm; 