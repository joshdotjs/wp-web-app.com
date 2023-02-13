import { useState, useEffect } from 'react';

import { Modal } from '@mantine/core';

import DropdownCheckbox from '../../../comps/dropdown-checkbox-external-state/dropdown-checkbox';

import Button from '../../../comps/button/button';
import Input from '../../../comps/input/input';

import { lc, lg, lo, lp, lb, lr, ly, log } from '../../../util/log';
import { getLS, setLS } from '../../../util/local-storage';
import { fireEvent } from '../../../util/custom-event';
import { fetchGET, fetchPOST } from '../../../util/fetch';
import { set2arr, slug, toMB } from '../../../util/transform';

// ==============================================

// tags: options
// setTags: setOptions()
// id: 'add-new-color-input-field'
// label: 'Tag'
// name: 'tags' // [name]: value
// 

export default function DropdownBox({ 
  options, setOptions, 
  name, label, endpoint, // colors, Color, /color
  css_id, // "add-new-color-input-field"
  form, formChangeHandler, // for dropown selection of options
  setActiveDropdownIdx,
  active_dropdown_idx,
  dropdown_number
}) {

// --------------------------------------------

const [modal, setModal] = useState(false);

// --------------------------------------------

const [input, setInput] = useState('');

const onChange = (e) => setInput(e.target.value);

// useEffect(() => {
//   console.log('input: ', input);
// }, [input]);

// --------------------------------------------

return (
  <>
    {/* - - - - - - - - - - - - - - - - - - */}

    <Modal
      opened={modal}
      onClose={() => setModal(false)}
      // title="Introduce yourself!"
      transition="fade"
      transitionDuration={400}
      exitTransitionDuration={400}
      transitionTimingFunction="ease"
      overlayColor='black'
      overlayOpacity={0.7}
      // overlayBlur={3}
      // fullScreen={true}
      // closeOnClickOutside={false}
      size="90%"
    >
      


      <Input
        id={css_id}
        label="Tag"
        placeholder={`Enter a new ${label.toLowerCase()}`}
        type="text"
        name={name}
        onChange={onChange}
      />


      <Button 
        classes={'mt-4'}
        onClick={async () => {

          // console.clear();
          lo(`sending request (create new ${label})`);
          // const url = `http://jadefse.local/wp-json/josh/v1${endpoint}`;
          const url = `${PHP.rest_url}/${endpoint}`;
          const body = {
            title: input, 
            slug: slug(input)
          };
          console.clear();
          console.log('body: ', body);
          console.log('url: ', url);
          const res = await fetchPOST(url, body); // custom endpoint
          console.log('Form submitted - res: ', res);
          const options = res[name];
          setOptions(options);
          // log(data, 'lightgreen', 'response');

          setModal(false); // close modal
      }}
      >
        Create {label}
      </Button>

    </Modal>

    {/* - - - - - - - - - - - - - - - - - - */}


    <div // dropdown (checkboxes) - Options
      style={{ position: 'relative', zIndex: active_dropdown_idx === dropdown_number ? 1 : 0 }}
    >
      <h5 class="text-md font-semibold text-gray-900">{label}</h5>
      {/* <Text>{label}</Text> */}
      <DropdownCheckbox
        data={options.length > 0 && options.map(({title, slug}) => ({value: slug, label: title}))}
        filter={name}
        filters={form}
        onChange={formChangeHandler}
        label={label}
        setActiveDropdownIdx={setActiveDropdownIdx}
        dropdown_number={dropdown_number}
      />

    </div>

    {/* - - - - - - - - - - - - - - - - - - */}
  </>
);
};

// ==============================================
