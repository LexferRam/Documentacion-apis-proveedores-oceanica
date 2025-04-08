import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Autocomplete, TextField} from '@mui/material';
import { Controller } from "react-hook-form"
import AwesomeDebouncePromise from 'awesome-debounce-promise';

export default function AdvisorController(props) {
  const { control, name, label, onChange, array, required, codBroker, ...rest } = props
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState(null)
  
  const asyncFunction = async function get_brokers_list(p_query, p_cod_broker) {
    const params = {
      p_query: p_query,
      p_cod_broker: p_cod_broker,
    }
    const response = await Axios.post("https://oceanicadeseguros.com/asg-api/dbo/insurance_broker/get_brokers_list", params)
    setOptions(response.data.p_cur_data)
    if(p_cod_broker!==null)
      setInputValue(response.data.p_cur_data[0])
  }

  const searchAPIDebounced = AwesomeDebouncePromise(asyncFunction, 380);

  useEffect(() => {
    if (codBroker) {
      const searchCode = codBroker ?? '1'
      asyncFunction(null, searchCode.toString())  
    } 
  }, [])

  return (
    <Controller
      label="Asesor de seguros"
      control={control}
      name={name}
      rules={{ required: required !== null ? required :true }}
      defaultValue={codBroker}
      setOptions={setOptions}
      inputValue={inputValue}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          id={`id_${name}`}
          fullWidth
          options={options ?? []}
          defaultValue={codBroker}
          loadingText="Cargando..."
          noOptionsText="Escriba para seleccionar su asesor"
          isOptionEqualToValue={(option, value) => option.NAME === value.NAME}
          getOptionLabel={(option) => option.NAME}
          onChange={(event,value) => {
            setInputValue(value.VALUE)
            field.onChange(value.VALUE)
            onChange && onChange(value ? value.VALUE : null)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              fullWidth
              error={error !== undefined}
              variant="standard"
              onChange={(e) => {
                if (e !== null) {
                  if (e.target.value !== undefined) {
                    if (e.target.value.length > 2){
                      searchAPIDebounced(e.target.value, null)
                    } else {setOptions([])}
                  }
                }
              }}
              helperText={
                error && error.type === 'required' && `Debe indicar el asesor`
              }
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      )}
    />)
}
