import { Box, forwardRef, useRadio, UseRadioProps } from "@chakra-ui/react"

const OrnamentRadio = forwardRef<UseRadioProps, "div">((props, ref) => {
    const { getInputProps, getCheckboxProps, htmlProps } = useRadio(props);

    return (
        <Box as="label" {...htmlProps} ref={ref} cursor="pointer">
            <input {...getInputProps()} hidden />
            <Box {...getCheckboxProps()} borderWidth="1px" boxShadow="md" rounded="md" p={3}>
                {props.children}
            </Box>
        </Box>
    )
});

export default OrnamentRadio