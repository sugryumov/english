import { FC } from "react";
import { Button, Form, Select, Typography } from "antd";
import { useActions } from "../../../../hooks/useActions";
import { EXERCISE_STEPS } from "../../../../constants/exerciseSteps";
import {
  OPTIONS_COUNT_VERBS,
  OPTIONS_FORM_VERBS,
  OPTIONS_LIST_VERBS,
} from "./options";

export const ExerciseSettings: FC = () => {
  const { setChangeStep, setIrregularVerbsSettings } = useActions();

  const onFinish = (values: any) => {
    setIrregularVerbsSettings(values);
    setChangeStep(EXERCISE_STEPS.EXERCISE);
  };

  return (
    <div className="exercise-settings">
      <Typography.Title level={2} className="exercise-settings__title">
        Irregular Verbs settings
      </Typography.Title>

      <Form
        name="exerciseSettings"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        className="exercise-settings__form"
      >
        <Form.Item
          name="count"
          label="Count verbs"
          rules={[{ required: true }]}
        >
          <Select
            allowClear
            size="large"
            placeholder="Select a option and change input text above"
          >
            {OPTIONS_COUNT_VERBS.map(({ title, value }) => (
              <Select.Option key={value} value={value}>
                {title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="list" label="List verbs" rules={[{ required: true }]}>
          <Select
            allowClear
            size="large"
            placeholder="Select a option and change input text above"
          >
            {OPTIONS_LIST_VERBS.map(({ title, value }) => (
              <Select.Option key={value} value={value}>
                {title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="form" label="Form verbs" rules={[{ required: true }]}>
          <Select
            allowClear
            size="large"
            placeholder="Select a option and change input text above"
          >
            {OPTIONS_FORM_VERBS.map(({ title, value }) => (
              <Select.Option key={value} value={value}>
                {title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Start exercise
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
