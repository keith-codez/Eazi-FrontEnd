import React from 'react';

const Step2DummyPayment = ({ onChange, formData }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Payment Step</h2>

      <label className="block mb-2">
        <input
          type="radio"
          name="payment"
          value="true"
          checked={formData.pay_now === true}
          onChange={() => onChange('pay_now', true)}
        />{' '}
        Pay Full Amount Now (Get Discount)
      </label>
      <label className="block mb-4">
        <input
          type="radio"
          name="payment"
          value="false"
          checked={formData.pay_now === false}
          onChange={() => onChange('pay_now', false)}
        />{' '}
        Pay at Counter
      </label>
    </div>
  );
};

export default Step2DummyPayment;
