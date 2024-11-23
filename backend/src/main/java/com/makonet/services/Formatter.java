package com.makonet.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Formatter {
    private static String customPattern = "yyyy.MM.dd HH:mm:ss";

    public static DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern(customPattern);

}
