import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

interface ExpandableTextProps {
    text: string;
    numberOfLines?: number;
}


const ExpandableText: React.FC<ExpandableTextProps> = ({ text, numberOfLines = 3 }) => {
    const [expanded, setExpanded] = useState(false);
    const [textShown, setTextShown] = useState(false); // chỉ hiện "xem thêm" nếu text quá dài
    const [isMeasured, setIsMeasured] = useState(false);

    // console.log(numberOfLines)
    return (
        <View style={{ width: '100%' }}>
            <Text
                style={{ flexShrink: 1, flexWrap: 'wrap', width: '100%', fontSize: 16 }}
                numberOfLines={expanded ? undefined : numberOfLines}
                onLayout={(e) => {
                    // console.log("s")
                    const lines = Math.ceil(e.nativeEvent.layout.height / 20); // Đo chiều cao và chia cho chiều cao 1 dòng
                    console.log(lines)
                    setTextShown(lines > numberOfLines);
                }}
            >
                {text}
            </Text>

            {textShown && (
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                    <Text style={{ color: '#007BFF', marginTop: 5 }}>
                        {expanded ? 'Collapse' : 'More'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ExpandableText;
